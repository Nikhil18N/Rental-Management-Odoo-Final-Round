-- Database initialization script for Docker
-- This will create the database and sample data for all team members

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Database will be created by Docker, so we just need to ensure it's ready
-- The TypeORM will handle table creation automatically

-- Optional: Create some initial data if needed
-- (TypeORM migrations will handle this, but this ensures DB is ready)
