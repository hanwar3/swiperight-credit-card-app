import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import type { User, RegisterResponse } from "./register";

export interface OAuthRequest {
  provider: 'google' | 'apple';
  accessToken: string;
  email: string;
  providerId: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
}

// Authenticates or creates a user via OAuth (Google/Apple).
export const oauth = api<OAuthRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/oauth" },
  async (req) => {
    const { provider, email, providerId, firstName, lastName, profilePictureUrl } = req;

    // Validate provider
    if (!['google', 'apple'].includes(provider)) {
      throw APIError.invalidArgument("Invalid OAuth provider");
    }

    // Check if user exists by provider ID
    let userRow = await authDB.queryRow`
      SELECT user_id, email, first_name, last_name, profile_picture_url, 
             auth_provider, email_verified, created_at, last_login
      FROM users 
      WHERE auth_provider = ${provider} AND provider_id = ${providerId}
    `;

    if (!userRow) {
      // Check if user exists with same email but different provider
      const existingEmailUser = await authDB.queryRow`
        SELECT user_id FROM users WHERE email = ${email.toLowerCase()}
      `;

      if (existingEmailUser) {
        throw APIError.alreadyExists("An account with this email already exists. Please sign in with your original method.");
      }

      // Create new user
      userRow = await authDB.queryRow`
        INSERT INTO users (email, auth_provider, provider_id, first_name, last_name, profile_picture_url, email_verified)
        VALUES (${email.toLowerCase()}, ${provider}, ${providerId}, ${firstName || null}, ${lastName || null}, ${profilePictureUrl || null}, true)
        RETURNING user_id, email, first_name, last_name, profile_picture_url, auth_provider, email_verified, created_at, last_login
      `;

      if (!userRow) {
        throw APIError.internal("Failed to create user");
      }
    } else {
      // Update existing user's profile information
      await authDB.exec`
        UPDATE users 
        SET first_name = COALESCE(${firstName}, first_name),
            last_name = COALESCE(${lastName}, last_name),
            profile_picture_url = COALESCE(${profilePictureUrl}, profile_picture_url),
            updated_at = NOW()
        WHERE user_id = ${userRow.user_id}
      `;
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
      firstName: userRow.first_name || firstName,
      lastName: userRow.last_name || lastName,
      profilePictureUrl: userRow.profile_picture_url || profilePictureUrl,
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
