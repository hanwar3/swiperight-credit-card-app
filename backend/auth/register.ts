import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcryptjs";

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: {
    userId: string;
    email: string;
    name?: string;
    authProvider: string;
  };
  token: string;
}

// Registers a new user with email and password.
export const register = api<RegisterRequest, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.email)) {
      throw APIError.invalidArgument("Invalid email format");
    }

    // Validate password strength
    if (req.password.length < 8) {
      throw APIError.invalidArgument("Password must be at least 8 characters");
    }

    // Check if user already exists
    const existingUser = await authDB.queryRow`
      SELECT user_id FROM users WHERE email = ${req.email.toLowerCase()}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(req.password, saltRounds);

    // Create user
    const user = await authDB.queryRow`
      INSERT INTO users (email, password_hash, auth_provider, name)
      VALUES (${req.email.toLowerCase()}, ${passwordHash}, 'email', ${req.name || null})
      RETURNING user_id, email, name, auth_provider
    `;

    if (!user) {
      throw APIError.internal("Failed to create user");
    }

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
