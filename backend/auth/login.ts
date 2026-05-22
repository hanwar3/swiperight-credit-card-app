import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import type { User, RegisterResponse } from "./register";

export interface LoginRequest {
  email: string;
  password: string;
}

// Authenticates a user with email and password.
export const login = api<LoginRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const { email, password } = req;

    // Find user by email
    const userRow = await authDB.queryRow`
      SELECT user_id, email, password_hash, first_name, last_name, profile_picture_url, 
             auth_provider, email_verified, created_at, last_login
      FROM users 
      WHERE email = ${email.toLowerCase()}
    `;

    if (!userRow) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Check if user registered with email/password
    if (userRow.auth_provider !== 'email' || !userRow.password_hash) {
      throw APIError.invalidArgument("Please sign in with your social account");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userRow.password_hash);
    if (!isValidPassword) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Generate JWT token
    const token = generateJWT(userRow.user_id);

    // Update last login
    await authDB.exec`
      UPDATE users SET last_login = NOW() WHERE user_id = ${userRow.user_id}
    `;

    const user: User = {
      userId: userRow.user_id,
      email: userRow.email,
      firstName: userRow.first_name,
      lastName: userRow.last_name,
      profilePictureUrl: userRow.profile_picture_url,
      authProvider: userRow.auth_provider,
      emailVerified: userRow.email_verified,
      createdAt: userRow.created_at.toISOString(),
      lastLogin: new Date().toISOString(),
    };

    return { user, token };
  }
);

function generateJWT(userId: string): string {
  // In a real implementation, use a proper JWT library with secret key
  // For now, we'll use a simple base64 encoded token
  const payload = {
    userId,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}
