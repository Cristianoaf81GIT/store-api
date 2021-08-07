#!/bin/bash

if [ ! -f  ".env" ]; then
    cp env_example .env
fi

npx yarn install 
npx yarn typeorm migration:run
npx yarn start:dev
