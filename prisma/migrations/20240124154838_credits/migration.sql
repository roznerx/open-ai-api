-- AlterTable
ALTER TABLE "next_auth"."users" ADD COLUMN     "credits" INTEGER DEFAULT 0;

grant usage on schema next_auth to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema next_auth to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema next_auth to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema next_auth to postgres, anon, authenticated, service_role;

alter default privileges in schema next_auth grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema next_auth grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema next_auth grant all on sequences to postgres, anon, authenticated, service_role;

