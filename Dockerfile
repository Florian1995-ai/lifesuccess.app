# Use the official Nginx image as a parent image
FROM nginx:alpine

# Create a directory for the app
WORKDIR /usr/share/nginx/html

# Copy all files
COPY . .

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]
