import { api, APIError } from "encore.dev/api";
import { Header } from "encore.dev/api";
import { authDB } from "./db";

export interface VerifyTokenRequest {
  authorization: Header<"Authorization">;
}

export interface VerifyTokenResponse {
  user: {
    userId: string;
    email: string;
    name?: string;
    authProvider: string;
  };
}

// Verifies JWT token and returns user information.
export const verifyToken = api<VerifyTokenRequest, VerifyTokenResponse>(
  { expose: true, method: "GET", path: "/auth/verify" },
  async (req) => {
    const token = req.authorization?.replace("Bearer ", "");
    if (!token) {
      throw APIError.unauthenticated("Missing authorization token");
    }

    try {
      // Decode JWT token (simplified - in production use proper JWT library)
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if token is expired
      if (decoded.exp < Date.now()) {
        throw APIError.unauthenticated("Token expired");
      }

      // Find user in database
      const user = await authDB.queryRow`
        SELECT user_id, email, name, auth_provider
        FROM users 
        WHERE user_id = ${decoded.userId}
      `;

      if (!user) {
        throw APIError.unauthenticated("Invalid token");
      }

      return {
        user: {
          userId: user.user_id,
          email: user.email,
          name: user.name,
          authProvider: user.auth_provider
        }
      };
    } catch (error) {
      throw APIError.unauthenticated("Invalid token");
    }
  }
);
