#!/usr/bin/env sh

# Allows providing runtime env configuration:
# deploy single docker image and use different env configurations
# (see ./public/env/)

if echo "$SERVICE_PROJECT_ID" | grep -q "prod"; then
  cp /var/www/env/prod.env.js /var/www/env/env.js
else
  cp /var/www/env/staging.env.js /var/www/env/env.js
fi

mkdir -p /var/log/nginx
ln -sf /dev/stdout /var/log/nginx/access.log
ln -sf /dev/stderr /var/log/nginx/error.log

exec nginx -g 'daemon off;'
