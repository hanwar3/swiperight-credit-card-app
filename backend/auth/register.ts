import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  authProvider: string;
  emailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

// Creates a new user account with email and password.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    const { email, password, firstName, lastName } = req;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw APIError.invalidArgument("Invalid email format");
    }

    // Validate password strength
    if (password.length < 8) {
      throw APIError.invalidArgument("Password must be at least 8 characters long");
    }

    // Check if user already exists
    const existingUser = await authDB.queryRow`
      SELECT user_id FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await authDB.queryRow`
      INSERT INTO users (email, password_hash, first_name, last_name, auth_provider)
      VALUES (${email.toLowerCase()}, ${passwordHash}, ${firstName || null}, ${lastName || null}, 'email')
      RETURNING user_id, email, first_name, last_name, profile_picture_url, auth_provider, email_verified, created_at, last_login
    `;

    if (!newUser) {
      throw APIError.internal("Failed to create user");
    }

    // Generate JWT token
    const token = generateJWT(newUser.user_id);

    // Update last login
    await authDB.exec`
      UPDATE users SET last_login = NOW() WHERE user_id = ${newUser.user_id}
    `;

    const user: User = {
      userId: newUser.user_id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      profilePictureUrl: newUser.profile_picture_url,
      authProvider: newUser.auth_provider,
      emailVerified: newUser.email_verified,
      createdAt: newUser.created_at.toISOString(),
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
