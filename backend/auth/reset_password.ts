import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Initiates password reset process by sending reset token.
export const forgotPassword = api<ForgotPasswordRequest, ForgotPasswordResponse>(
  { expose: true, method: "POST", path: "/auth/forgot-password" },
  async (req) => {
    // Find user by email
    const user = await authDB.queryRow`
      SELECT user_id FROM users 
      WHERE email = ${req.email.toLowerCase()} AND auth_provider = 'email'
    `;

    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: "If an account with that email exists, a password reset link has been sent." };
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store reset token
    await authDB.exec`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${user.user_id}, ${token}, ${expiresAt})
    `;

    // In a real application, you would send an email here
    console.log(`Password reset token for ${req.email}: ${token}`);

    return { message: "If an account with that email exists, a password reset link has been sent." };
  }
);

// Resets password using the provided token.
export const resetPassword = api<ResetPasswordRequest, ResetPasswordResponse>(
  { expose: true, method: "POST", path: "/auth/reset-password" },
  async (req) => {
    // Validate password strength
    if (req.newPassword.length < 8) {
      throw APIError.invalidArgument("Password must be at least 8 characters");
    }

    // Find valid reset token
    const resetToken = await authDB.queryRow`
      SELECT rt.user_id, rt.id
      FROM password_reset_tokens rt
      WHERE rt.token = ${req.token} 
        AND rt.expires_at > NOW() 
        AND rt.used = FALSE
    `;

    if (!resetToken) {
      throw APIError.invalidArgument("Invalid or expired reset token");
    }

    // Hash new password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(req.newPassword, saltRounds);

    // Update user password
    await authDB.exec`
      UPDATE users 
      SET password_hash = ${passwordHash}
      WHERE user_id = ${resetToken.user_id}
    `;

    // Mark token as used
    await authDB.exec`
      UPDATE password_reset_tokens 
      SET used = TRUE 
      WHERE id = ${resetToken.id}
    `;

    return { message: "Password has been reset successfully" };
  }
);
