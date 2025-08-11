import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

class JwtUtils {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
    this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
  }

  /**
   * Generate access token
   */
  generateAccessToken(user: IUser): string {
    const payload: JwtPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
      issuer: 'rental-management-system',
      audience: 'rental-management-users'
    });
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(user: IUser): string {
    const payload = {
      userId: user._id,
      email: user.email,
      tokenType: 'refresh'
    };

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
      issuer: 'rental-management-system',
      audience: 'rental-management-users'
    });
  }

  /**
   * Generate both access and refresh tokens
   */
  generateTokenPair(user: IUser): TokenPair {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    };
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.jwtSecret, {
        issuer: 'rental-management-system',
        audience: 'rental-management-users'
      }) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.refreshSecret, {
        issuer: 'rental-management-system',
        audience: 'rental-management-users'
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      } else {
        throw new Error('Refresh token verification failed');
      }
    }
  }

  /**
   * Extract token from Authorization header
   */
  extractTokenFromHeader(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header format');
    }
    
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  /**
   * Decode token without verification (for debugging)
   */
  decodeToken(token: string): any {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error('Failed to decode token');
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) {
        return true;
      }
      
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get token expiration time
   */
  getTokenExpiration(token: string): Date | null {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) {
        return null;
      }
      
      return new Date(decoded.exp * 1000);
    } catch (error) {
      return null;
    }
  }
}

export const jwtUtils = new JwtUtils();
