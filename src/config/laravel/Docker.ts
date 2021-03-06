export const DockerFile = `
FROM php:7.2-fpm

COPY composer.lock composer.json /var/www/

COPY database /var/www/database

WORKDIR /var/www

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === '55d6ead61b29c7bdee5cccfb50076874187bd9f21f65d8991d46ec5cc90518f447387fb9f76ebae1fbbacf329e583e30') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && php composer.phar install --no-dev --no-scripts \
    && rm composer.phar

COPY . /var/www

RUN chown -R www-data:www-data \
        /var/www/storage \
        /var/www/bootstrap/cache

RUN php artisan optimize
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
            - /var/www/storage
        env_file: ".env"
    OTHER_SERVICES
    nginx:
        build:
            context: ./nginx
        ports:
            - CLIENT_PORT:PROJECT_PORT
        depends_on:
            - web

networks:
    dockergenfile:
`;
