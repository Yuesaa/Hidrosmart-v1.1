
-- Fix admin login issue by creating proper admin user with corrected variable naming
DO $$
DECLARE
    target_admin_id UUID := '0911094d-48fe-49d9-a8f2-b2eb4d8c8b08';
BEGIN
    -- Delete existing incomplete admin_user_id record if exists
    DELETE FROM public.admin_user_id WHERE id = target_admin_id;
    
    -- Ensure admin user exists in auth.users with correct password
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin,
        role
    ) VALUES (
        target_admin_id,
        '00000000-0000-0000-0000-000000000000',
        'admin@hidrosmart.com',
        crypt('admin', gen_salt('bf')),
        now(),
        '',
        '',
        '',
        '',
        now(),
        now(),
        '{"name": "Admin HidroSmart"}'::jsonb,
        false,
        'authenticated'
    ) ON CONFLICT (id) DO UPDATE SET
        email = 'admin@hidrosmart.com',
        encrypted_password = crypt('admin', gen_salt('bf')),
        email_confirmed_at = now(),
        updated_at = now();
    
    -- Ensure profile exists
    INSERT INTO public.profiles (id, name, email, created_at, updated_at)
    VALUES (
        target_admin_id,
        'Admin HidroSmart',
        'admin@hidrosmart.com',
        now(),
        now()
    ) ON CONFLICT (id) DO UPDATE SET
        name = 'Admin HidroSmart',
        email = 'admin@hidrosmart.com',
        updated_at = now();
    
    -- Ensure admin role exists
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_admin_id, 'admin'::user_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin user setup completed successfully';
END $$;
