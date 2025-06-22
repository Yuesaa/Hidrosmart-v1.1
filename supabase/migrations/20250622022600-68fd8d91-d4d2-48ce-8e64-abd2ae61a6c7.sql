
-- First, let's check if admin user already exists and update their role
-- Update existing user to have admin role if they exist
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Try to find existing admin user
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@hidrosmart.com' LIMIT 1;
    
    IF admin_user_id IS NOT NULL THEN
        -- User exists, ensure they have admin role
        INSERT INTO public.user_roles (user_id, role)
        VALUES (admin_user_id, 'admin'::user_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        -- Update profile if exists
        UPDATE public.profiles 
        SET name = 'Admin HidroSmart', email = 'admin@hidrosmart.com'
        WHERE id = admin_user_id;
        
        RAISE NOTICE 'Updated existing admin user with role';
    ELSE
        RAISE NOTICE 'No existing admin user found - you may need to sign up manually';
    END IF;
END $$;
