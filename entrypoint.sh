#!/bin/sh
set -e

npx prisma migrate deploy
npx prisma db seed 2>&1 | cat

exec node dist/src/main.js
