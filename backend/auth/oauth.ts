import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import type { AuthResponse } from "./register";

export interface OAuthRequest {
  provider: 'google' | 'apple';
  providerId: string;
  email: string;
  name?: string;
}

// Handles OAuth authentication for Google and Apple.
export const oauth = api<OAuthRequest, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/oauth" },
  async (req) => {
    // Validate provider
    if (!['google', 'apple'].includes(req.provider)) {
      throw APIError.invalidArgument("Invalid OAuth provider");
    }

    // Check if user exists by provider ID
    let user = await authDB.queryRow`
      SELECT user_id, email, name, auth_provider
      FROM users 
      WHERE provider_id = ${req.providerId} AND auth_provider = ${req.provider}
    `;

    if (!user) {
      // Check if user exists by email with different provider
      const existingUser = await authDB.queryRow`
        SELECT user_id FROM users WHERE email = ${req.email.toLowerCase()}
      `;

      if (existingUser) {
        throw APIError.alreadyExists("User with this email already exists with different login method");
      }

      // Create new user
      user = await authDB.queryRow`
        INSERT INTO users (email, auth_provider, provider_id, name)
        VALUES (${req.email.toLowerCase()}, ${req.provider}, ${req.providerId}, ${req.name || null})
        RETURNING user_id, email, name, auth_provider
      `;

      if (!user) {
        throw APIError.internal("Failed to create user");
      }
    } else {
      // Update last login for existing user
      await authDB.exec`
        UPDATE users SET last_login = NOW() WHERE user_id = ${user.user_id}
      `;
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
