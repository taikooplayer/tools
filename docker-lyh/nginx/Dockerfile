#安装最新的nginx版本
FROM nginx

MAINTAINER vince<873468428@qq.com>

ENV RUN_USER www
ENV RUN_GROUP www
ENV LOG_DIR /data/log/nginx

#RUN apt-get update
RUN mkdir ${LOG_DIR} -p
RUN useradd ${RUN_USER}
RUN chown -R ${RUN_USER}:${RUN_GROUP} ${LOG_DIR}
# RUN apt-get update

#EXPOSE 80
# ENTRYPOINT nginx -g "daemon off;"
ENTRYPOINT ["nginx", "-g", "daemon off;"]


