import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import type { User } from "./register";

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  user: User;
}

// Verifies JWT token and returns user information.
export const verifyToken = api<VerifyTokenRequest, VerifyTokenResponse>(
  { expose: true, method: "POST", path: "/auth/verify" },
  async (req) => {
    const { token } = req;

    try {
      // Decode JWT token
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if token is expired
      if (Date.now() > payload.exp) {
        throw APIError.unauthenticated("Token has expired");
      }

      // Find user
      const userRow = await authDB.queryRow`
        SELECT user_id, email, first_name, last_name, profile_picture_url, 
               auth_provider, email_verified, created_at, last_login
        FROM users 
        WHERE user_id = ${payload.userId}
      `;

      if (!userRow) {
        throw APIError.unauthenticated("Invalid token");
      }

      const user: User = {
        userId: userRow.user_id,
        email: userRow.email,
        firstName: userRow.first_name,
        lastName: userRow.last_name,
        profilePictureUrl: userRow.profile_picture_url,
        authProvider: userRow.auth_provider,
        emailVerified: userRow.email_verified,
        createdAt: userRow.created_at.toISOString(),
        lastLogin: userRow.last_login?.toISOString(),
      };

      return { user };
    } catch (error) {
      throw APIError.unauthenticated("Invalid token");
    }
  }
);
