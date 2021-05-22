const BaseDockerFile = 'FROM python:3.8-alpine\nENV PATH="/scripts:${PATH}"';

export const DockerFile =
  BaseDockerFile +
  `
COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers
RUN pip install -r /requirements.txt
RUN apk del .tmp

WORKDIR /app
COPY ./PROJECT_NAME .
COPY ./entrypoint.sh .

RUN chmod +x ./entrypoint.sh

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

RUN adduser -D user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/
USER user

EXPOSE PROJECT_PORT

CMD ["entrypoint.sh"]
`;

export const DockerCompose = `
version: '3.7'
services:
    web:
        container_name: PROJECT_NAME
        build:
            context: .
            dockerfile: Dockerfile
        volumes:
            - static_data:/vol/web
        environment:
            - DEBUG=False
            - SECRET_KEY=samplesecret123
            - ALLOWED_HOSTS=127.0.0.1,localhost

    OTHER_SERVICES

    nginx:
        build:
            context: ./nginx
        volumes:
            - static_data:/vol/static
        ports:
            - CLIENT_PORT:8080
        depends_on:
            - web

volumes:
    data:
    static_data:
networks:
    dockergenfile:
`;
