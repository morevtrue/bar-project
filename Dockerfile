FROM node:20-alpine as packages
WORKDIR /opt/build/frontend
COPY package.json .
COPY package-lock.json .
RUN npm i

FROM node:20-alpine as builder
ENV REACT_APP_PUBLIC_URL /
WORKDIR /opt/build/frontend
COPY --from=packages /opt/build/frontend/node_modules ./node_modules
COPY . .
RUN npm run build

# FROM nginx:mainline-alpine
# WORKDIR /usr/share/nginx/html
# COPY update_nginx_config.ed /
# RUN ed /etc/nginx/conf.d/default.conf < /update_nginx_config.ed && rm /update_nginx_config.ed
# COPY --from=builder /opt/build/frontend/build .