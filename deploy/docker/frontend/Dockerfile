FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./

RUN npm ci --frozen-lockfile

COPY frontend/ .

RUN npm run build

FROM nginx:1.29-alpine

LABEL maintainer="jerem.woirhaye@gmail.com"
LABEL app="registry-view-front"

COPY --from=build /app/dist /usr/share/nginx/html
COPY deploy/docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d \
  && touch /var/run/nginx.pid \
  && chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]