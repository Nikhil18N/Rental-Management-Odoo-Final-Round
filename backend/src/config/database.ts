import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { UserProfile } from '../entities/UserProfile';
import { Category } from '../entities/Category';
import { Product } from '../entities/Product';
import { ProductVariant } from '../entities/ProductVariant';
import { Quotation } from '../entities/Quotation';
import { QuotationItem } from '../entities/QuotationItem';
import { BookingOrder } from '../entities/BookingOrder';
import { BookingOrderItem } from '../entities/BookingOrderItem';
import { Invoice } from '../entities/Invoice';
import { InvoiceItem } from '../entities/InvoiceItem';
import { Payment } from '../entities/Payment';
import { DeliveryRecord } from '../entities/DeliveryRecord';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'rental_management',
  synchronize: process.env.NODE_ENV === 'development', // Only for development
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User,
    UserProfile,
    Category,
    Product,
    ProductVariant,
    Quotation,
    QuotationItem,
    BookingOrder,
    BookingOrderItem,
    Invoice,
    InvoiceItem,
    Payment,
    DeliveryRecord,
  ],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ PostgreSQL Connected Successfully');
    console.log(`📂 Database: ${process.env.DB_NAME || 'rental_management'}`);
    console.log(`🏠 Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}`);
  } catch (error: any) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    if (process.env.NODE_ENV !== 'development') {
      process.exit(1);
    }
  }
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    // Execute a simple query to test connection
    await AppDataSource.query('SELECT 1');
    console.log('🏓 Database ping successful');
    return true;
  } catch (error) {
    console.error('❌ Database ping failed:', error);
    return false;
  }
};

export const initializeDatabase = connectDB;

export default connectDB;
