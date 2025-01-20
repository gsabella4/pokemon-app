-- **************************************************************
-- This script destroys the database and associated users
-- **************************************************************

-- The following line terminates any active connections to the database so that it can be destroyed
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'pokemon_app';

DROP DATABASE pokemon_app;

DROP USER pokemon_app_owner;
DROP USER pokemon_app_appuser;
