import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Initiates password reset process by sending reset token.
export const forgotPassword = api<ForgotPasswordRequest, { message: string }>(
  { expose: true, method: "POST", path: "/auth/forgot-password" },
  async (req) => {
    const { email } = req;

    // Find user by email
    const user = await authDB.queryRow`
      SELECT user_id, auth_provider FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: "If an account with this email exists, you will receive a password reset link." };
    }

    if (user.auth_provider !== 'email') {
      throw APIError.invalidArgument("This account uses social login. Please sign in with your social account.");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store reset token
    await authDB.exec`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${user.user_id}, ${resetToken}, ${expiresAt})
    `;

    // In a real implementation, send email with reset link
    // For now, we'll just return the token (remove this in production)
    console.log(`Password reset token for ${email}: ${resetToken}`);

    return { message: "If an account with this email exists, you will receive a password reset link." };
  }
);

// Resets user password using reset token.
export const resetPassword = api<ResetPasswordRequest, { message: string }>(
  { expose: true, method: "POST", path: "/auth/reset-password" },
  async (req) => {
    const { token, newPassword } = req;

    // Validate password strength
    if (newPassword.length < 8) {
      throw APIError.invalidArgument("Password must be at least 8 characters long");
    }

    // Find valid reset token
    const resetTokenRow = await authDB.queryRow`
      SELECT user_id, expires_at, used 
      FROM password_reset_tokens 
      WHERE token = ${token}
    `;

    if (!resetTokenRow) {
      throw APIError.invalidArgument("Invalid or expired reset token");
    }

    if (resetTokenRow.used) {
      throw APIError.invalidArgument("Reset token has already been used");
    }

    if (new Date() > resetTokenRow.expires_at) {
      throw APIError.invalidArgument("Reset token has expired");
    }

    // Hash new password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    await authDB.exec`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = NOW()
      WHERE user_id = ${resetTokenRow.user_id}
    `;

    // Mark token as used
    await authDB.exec`
      UPDATE password_reset_tokens 
      SET used = true 
      WHERE token = ${token}
    `;

    return { message: "Password has been reset successfully" };
  }
);
