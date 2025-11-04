#!/bin/sh
until nc -z db 5432; do
  echo "Waiting for Postgres..."
  sleep 2
done
echo "Postgres is up!"
exec "$@"
