import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcryptjs";
import type { AuthResponse } from "./register";

export interface LoginRequest {
  email: string;
  password: string;
}

// Authenticates a user with email and password.
export const login = api<LoginRequest, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    // Find user by email
    const user = await authDB.queryRow`
      SELECT user_id, email, password_hash, auth_provider, name
      FROM users 
      WHERE email = ${req.email.toLowerCase()} AND auth_provider = 'email'
    `;

    if (!user) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(req.password, user.password_hash);
    if (!isValidPassword) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Update last login
    await authDB.exec`
      UPDATE users SET last_login = NOW() WHERE user_id = ${user.user_id}
    `;

    // Generate JWT token (simplified - in production use proper JWT library)
    const token = Buffer.from(JSON.stringify({
      userId: user.user_id,
      email: user.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    })).toString('base64');

    return {
      user: {
        userId: user.user_id,
        email: user.email,
        name: user.name,
        authProvider: user.auth_provider
      },
      token
    };
  }
);
