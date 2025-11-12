# Elasticle

Interview round project - you can see it running on
https://elasticle.zbav-se.me

I've used my domain - when you finish, I'll shut id down.

Some notes:
- Running on Vercel
- When doing production build and deployment, I would use CDN for static assets
    - In our region and due to good pricing, Bunny.net (CND) and idrivee2.com (S3 compatible storage) is quite a good option
- The quest was to create user management - Clerk, 1M users for free
    - Or Better Auth as it's somehow successor of next-auth/auth.js
    - Manual login/session management _should not be done by a common dev_
- I'm using cookies as they provide quite a good security instead of sending tokens (and storing) them around (e.g. in local storage - not secure)
- Cross domain support is quite messy, but e.g. backend.example.com and example.com should have properly setup Allow Origin, so it's still OK
- I'm used to Biome, but Next.js scaffolded eslint and teams are probably more used to it, so I won't change that one
    - Biome is used only for formatting, Prettier feels quite lazy for me, but it's a preference
- Migrations are unresolved in general - this can be done e.g. in an CI/CD action with access to DB and running prisma or whatever solution you're used to (e.g. I'm using Kysely TS migrations, so I can run arbitrary code - for example data based migrations or seeds)