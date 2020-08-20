FROM nginx:alpine
ARG key_store_pass
# install openssl
RUN apk add --no-cache openssl
# copy keystore
COPY keystore.p12 /
RUN mkdir -p /etc/nginx/ssl
# extract certificate
RUN openssl pkcs12 -nokeys -in keystore.p12 -out /etc/nginx/ssl/mynotes.pem -password pass:$key_store_pass
# extract private key
RUN openssl pkcs12 -nocerts -nodes -in keystore.p12 -out /etc/nginx/ssl/mynotes.key -password pass:$key_store_pass
# remove keystore
RUN rm keystore.p12
# uninstall openssl
RUN apk del openssl
# copy static files
COPY dist /usr/share/nginx/html/
# copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# patch the api port in the env.js
RUN sed -i "/API_PORT/c\      API_PORT: null" /usr/share/nginx/html/env.js
EXPOSE 80 443

#docker build --build-arg key_store_pass=spring -t chat-front .
#docker run -d -p 80:80 -p 443:443 --name chat_front chat-front

# to expose this setup to Internet with ngrok:
# ngrok http 192.168.0.103:443 -host-header=rewrite
