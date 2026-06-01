#!/bin/sh
set -e

echo "Aplicando schema..."
npx prisma db push

echo "Ejecutando seed..."
node prisma/seed.js

echo "Iniciando servidor..."
node src/app.js