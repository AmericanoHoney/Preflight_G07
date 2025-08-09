#!/bin/bash

# Frontend Test Runner Script
# This script sets up environment variables and runs Cypress tests for the frontend

echo "Starting Frontend Tests..."

# Set environment variables
export FRONTEND_URL=${FRONTEND_URL:-"http://localhost:4000"}
export BACKEND_URL=${BACKEND_URL:-"http://localhost:3000"}

echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"

# Check if frontend is running
echo "Checking if frontend is accessible..."
if curl -f -s "$FRONTEND_URL" > /dev/null; then
    echo "Frontend is accessible"
else
    echo "Frontend is not accessible at $FRONTEND_URL"
    echo "Please make sure the frontend is running before running tests"
    exit 1
fi

# Check if backend is running
echo "Checking if backend is accessible..."
if curl -f -s "$BACKEND_URL/health" > /dev/null 2>&1 || curl -f -s "$BACKEND_URL" > /dev/null 2>&1; then
    echo "Backend is accessible"
else
    echo "Backend is not accessible at $BACKEND_URL"
    echo "Please make sure the backend is running before running tests"
    exit 1
fi

# Run Cypress tests
echo "Running Cypress tests..."

if [ "$1" = "headless" ]; then
    echo "Running in headless mode..."
    npx cypress run --spec "cypress/e2e/frontend.cy.ts"
else
    echo "Opening Cypress GUI..."
    npx cypress open
fi

echo "Frontend tests completed!"
