#!/bin/bash

export PGPASSWORD="node_password"

database="ecoSysDB"

echo "Configuring database: $database"

dropdb -U node_user $database
createdb -U node_user $database

psql -U node_user $database < ./bin/sql/dbBuild.sql

echo "$database configured"