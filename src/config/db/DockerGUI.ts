export const phpMyAdminService = `
\tphpmyadmin:
    \timage: phpmyadmin
    \trestart: always
    \tports:
        \t- 8088:80
    \texpose:
        \t- 80
    \tnetworks:
        \t- dockergenfile
`;
export const pgAdminService = `
\tpgadmin4:
    \timage: dpage/pgadmin4
    \trestart: always
    \tenvironment:
        \t- PGADMIN_DEFAULT_EMAIL = admin@pg.com
        \t- PGADMIN_DEFAULT_PASSWORD = admin
        \t- PGADMIN_LISTEN_PORT = 80
    \tports:
        \t- 8899:80
    \texpose:
        \t- 80
    \tnetworks:
        \t- dockergenfile
    depends_on:
        \t- postgresql_database
`;
export const mongoClientService = `
\tmongoclient:
    \timage: mongoclient/mongoclient
    \trestart: always
    \tports:
        \t- 5520:3000
    \texpose:
        \t- 3000
    \tnetworks:
        \t- dockergenfile
    depends_on:
        \t- mongodb_database
`;
