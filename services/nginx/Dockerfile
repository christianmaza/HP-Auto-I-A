FROM nginx:1.19.10-alpine-perl
RUN apk add make gcc g++ linux-headers nss-tools
COPY createssl.sh .
RUN chmod +x createssl.sh
RUN ./createssl.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
#RUN nginx -t
#RUN service nginx reload