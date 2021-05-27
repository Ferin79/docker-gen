export const phpMyAdminService = `
    phpmyadmin:
        image: phpmyadmin
        restart: always
        ports:
            - 8088:80
        expose:
            - 80
        networks:
            - dockergenfile
`;
export const pgAdminService = `
    pgadmin4:
        image: dpage/pgadmin4
        restart: always
        environment:
            - PGADMIN_DEFAULT_EMAIL = admin@pg.com
            - PGADMIN_DEFAULT_PASSWORD = admin
            - PGADMIN_LISTEN_PORT = 80
        ports:
            - 8899:80
        expose:
            - 80
        networks:
            - dockergenfile
        depends_on:
            - postgresql_database
`;
export const mongoClientService = `
    mongoclient:
        image: mongoclient/mongoclient
        restart: always
        ports:
            - 5520:3000
        expose:
            - 3000
        networks:
            - dockergenfile
        depends_on:
            - mongodb_database
`;
