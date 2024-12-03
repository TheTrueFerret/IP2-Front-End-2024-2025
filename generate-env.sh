#!/bin/bash

# Creating the .env.production file
# Using default values if environment variables are not set
cat > .env.production << EOF
VITE_KEYCLOAK_URL=${VITE_KEYCLOAK_URL:-http://localhost:8180}
VITE_KEYCLOAK_REALM=${VITE_KEYCLOAK_REALM:-Rummikub}
VITE_KEYCLOAK_CLIENT_ID=${VITE_KEYCLOAK_CLIENT_ID:-RummikubApp}
VITE_KEYCLOAK_CLIENT_SECRET=${VITE_KEYCLOAK_CLIENT_SECRET:-default-secret}
VITE_BACKEND_URL=${VITE_BACKEND_URL:-http://localhost:8080}
VITE_REACT_APP_URL=${VITE_REACT_APP_URL:-http://localhost:4000}
EOF

# Displaying the generated file contents
echo "the environment variables loaded into the .env.production:"
cat .env.production

# WARNING!!!!
# Always exiting succesfully to make sure the first build works!
# Because variables will be added via docker-compose
exit 0
