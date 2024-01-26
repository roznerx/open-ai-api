/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);


grant usage on schema public to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema next_auth to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema next_auth to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema next_auth to postgres, anon, authenticated, service_role;

alter default privileges in schema next_auth grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema next_auth grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema next_auth grant all on sequences to postgres, anon, authenticated, service_role;
