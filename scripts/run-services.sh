#!/bin/bash

# Navigate to the services directory
cd services

# Loop through each directory in the services folder
for service in */; do
    # Remove the trailing slash from the directory name
    service=${service%/}
    
    # Change to the service directory
    cd "$service"
    
    # Run npm run dev in the background
    echo "Starting $service..."
    npm run dev &
    
    # Change back to the services directory
    cd ..
done

# Wait for all background processes to finish
wait

echo "All services have been started."
