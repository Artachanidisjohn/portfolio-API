#!/bin/bash

set -e

if [ ! -d /usr/local/lib/node_modules/express-generator ]; then
    echo "=== Install express-generator ==="
    npm install -g express-generator
fi

if [ ! -f .env ]; then
    echo "=== Write .env ==="
    
    env_file="./.env"
    touch $env_file
    
    while IFS= read -r line; do
    var_name=$(echo "$line" | awk -F= '{print $1}')
    var_value=$(echo "$line" | awk -F= '{print $2}')
    
    if [[ -z "$var_name" || -z "$var_value" ]]; then
        echo "Unknown variable: $line"
        continue
    fi
    
    echo "$var_name=$var_value" >> "$env_file"
done < <(env)
fi

if [ ! -d ./node_modules ]; then
    echo "=== node_modules not found! ==="
    echo "=== Run NPM Install ==="
    npm install
fi

echo "=== Node Run ==="
exec "$@"
