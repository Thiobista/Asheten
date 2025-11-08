-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create images table
CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    certificate_url TEXT NOT NULL,
    issued_by VARCHAR(255),
    issued_date DATE,
    expiry_date DATE,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    achievement_date DATE,
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table (using Supabase auth, but we can add additional fields)
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for frontend)
CREATE POLICY "Public images are viewable by everyone"
    ON images FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public certificates are viewable by everyone"
    ON certificates FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public achievements are viewable by everyone"
    ON achievements FOR SELECT
    USING (is_active = true);

-- Create policies for admin access (authenticated users with admin role)
CREATE POLICY "Admins can insert images"
    ON images FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update images"
    ON images FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete images"
    ON images FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can insert certificates"
    ON certificates FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update certificates"
    ON certificates FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete certificates"
    ON certificates FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can insert achievements"
    ON achievements FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update achievements"
    ON achievements FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete achievements"
    ON achievements FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_images_category ON images(category);
CREATE INDEX idx_images_active ON images(is_active);
CREATE INDEX idx_certificates_active ON certificates(is_active);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_active ON achievements(is_active);





