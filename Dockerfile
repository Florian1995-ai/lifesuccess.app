# Use the official Nginx image as a parent image
FROM nginx:alpine

# Copy the static content to the Nginx server
COPY . /usr/share/nginx/html

# Copy a custom nginx configuration file (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]
