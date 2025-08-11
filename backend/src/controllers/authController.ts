import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import { jwtUtils } from '../utils/jwt';
import { validationResult } from 'express-validator';
import crypto from 'crypto';

/**
 * User Registration
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
      return;
    }

    const { name, email, password, phone, role = 'customer' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      role: role === 'admin' ? 'admin' : 'customer' // Only allow admin creation through specific endpoint
    });

    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = jwtUtils.generateTokenPair(user);

    // Remove password from response
    const userResponse = user.toJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * User Login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
      return;
    }

    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email, isActive: true }).select('+password');
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Check if account is locked
    if (user.isLocked()) {
      res.status(423).json({
        success: false,
        message: 'Account temporarily locked due to too many failed login attempts'
      });
      return;
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      await user.incLoginAttempts();
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = jwtUtils.generateTokenPair(user);

    // Remove password from response
    const userResponse = user.toJSON();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * Refresh Access Token
 */
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser; // User is attached by validateRefreshToken middleware

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = jwtUtils.generateTokenPair(user);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        tokens: {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
      }
    });

  } catch (error: any) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Token refresh failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * Get Current User Profile
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: user.toJSON()
      }
    });

  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * Update User Profile
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password;
    delete updates.role;
    delete updates.permissions;
    delete updates.isActive;
    delete updates.loginAttempts;
    delete updates.lockUntil;

    // Update user
    Object.assign(user, updates);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.toJSON()
      }
    });

  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * Change Password
 */
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
      return;
    }

    const user = req.user as IUser;
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const userWithPassword = await User.findById(user._id).select('+password');
    
    if (!userWithPassword) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await userWithPassword.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }

    // Update password
    userWithPassword.password = newPassword;
    await userWithPassword.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error: any) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * Logout (Invalidate Token)
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just return a success response
    // The client should remove the token from storage

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * Delete Account
 */
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    const { password } = req.body;

    // Get user with password for verification
    const userWithPassword = await User.findById(user._id).select('+password');
    
    if (!userWithPassword) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Verify password before deletion
    const isPasswordValid = await userWithPassword.comparePassword(password);
    
    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
      return;
    }

    // Instead of deleting, deactivate the account
    userWithPassword.isActive = false;
    await userWithPassword.save();

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
