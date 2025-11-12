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
- I18n - highly depends, what you like, I've custom stuff I don't want to pull here (I'm doing root redirect by locale provided by browser, e.g. / -> /cs)

## ~~React~~ Tanstack Query

For me useful to handle mutations in general and co.

Same for queries - it's one mechanic working client-side/hydratable from server side you can simply invalidate using mutations, no messing with re-rendering whole page because of one changed item.

## Why user_profile as standalone table?

I'm using Better Auth which manages it's own set of tables and in general it's _not a good idea_ to mess with those tables. In general it does not take such a hit to join/get data from "external" table as there are bunch of tools we may use, e.g. Redis or whatever to do caching (in this case it's maybe more overkill as it highly depends on where Redis and Database and users are geologically).


## Schemas

This may look a bit strange, but the trick is I can hide everything under one name (useful e.g. when you're doing exports, so it's not necessary to export X/Y/Z just because of one schema).

```
// Schema itself, boring stuff
const LoginSchema = z.object({
	email: z
		.email("Please enter a valid email.")
		.transform((value) => value.trim()),
	password: z.string().min(1, "Please enter your password."),
});

// The type of schema itself (Zod stuff)
type LoginSchema = typeof LoginSchema;

// Namespace hides "tools" of the schema
export namespace LoginSchema {
    // Here are actual values from schema
	export type Type = z.infer<LoginSchema>;
}
```

Then you can just export `LoginSchema` and you're ok, same for usage `LoginSchema.Type` and tadaa, you've types.

## Uploads

Uploads are using my CDN and s3 bucket, but are naive (no checks for file size nor it's type), just for time sake.


## Styling

I'm using twMerge (`tvc` shorthand) just because I'm used to, also it's nicer for me to read array of classes than classic TW ultra-long-noodle.

In general I'm using different styling approach (styles extracted into standalone file, using classic TW in slots - something like TVA).

### Mobile

Nope - I just want give a limited time to the implementation, so I've been only focused on desktop version.

I've experience with mobile-only app, just the hybrid approach ("responsive") is not theme for me now.

## Editor

I've picked up Lexical (I've used it before):
- instead of relaying on some pseudo "security", I'm storing whole editor state
- render just uses editor state, so we do not parse any user's input, only "AST" from the editor

## CLS

I was lazy to strip off all the stuff from Editor, so I've pulled a bit from CLS library for styling, which stands out of "common" styling in this project. In normal circumstances I would use unified approach.

### Design

I'm backend guy by my origin - I can do styling, but here it was lower prio as I'm a bit _weaker_ in making cool and nice UI's - in contrast, I've _experience with UX_, but make things nice takes more time for me.

## Document

I know about ARIA and accessibility, also, not topic for now; related is usage of "div-rules-the-world" - just to prevent situation in hydration mismatches like `div cannot be under p` and so on.

## Code

This code is a bit of hybrid how I usually work, but it's still synthetic so please keep that in mind.

## AI Usage

I've used AI (Cursor Agent) for generating scaffolding and some boring stuff I was lazy to write by hand. Because this is more about connecting things together than actual logic, it was much faster for me.

Concepts and architecture are done by hand (my hand). I've used my other hand too. Styling (for sake of time) is more AI stuff, curated by me.

_I'm just honest with you_