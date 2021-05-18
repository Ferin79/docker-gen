export const MySQLService = `
\tmysql_database:
    \timage: mysql
    \trestart: always
    \tenvironment:
        \tMYSQL_DATABASE: test_db
        \tMYSQL_ROOT_PASSWORD: root
        \tMYSQL_ROOT_PASSWORD: root
    \tports:
        \t- 3306:3306
    \texpose:
        \t- 3306
    \tvolumes:
        \t- data/mysql:/var/lib/mysql
    \tnetworks:
        \t- dockergenfile
`;

export const MariaDBService = `
\tmariadb_database:
    \timage: mariadb
    \trestart: always
    \tenvironment:
        \tMYSQL_DATABASE: test_db
        \tMYSQL_ROOT_PASSWORD: root
        \tMYSQL_ROOT_PASSWORD: root
    \tports:
        \t- 3306:3306
    \texpose:
        \t- 3306
    \tvolumes:
        \t- data/mariadb:/var/lib/mysql
    \tnetworks:
        \t- dockergenfile
`;

export const PostgreService = `
\tpostgresql_database:
    \timage: postgres:alpine
    \trestart: always
    \tenvironment:
        \tPOSTGRES_DB: test_db
        \tPOSTGRES_USER: postgres
        \tPOSTGRES_PASSWORD: postgres
    \tports:
        \t- 5432:5432
    \texpose:
        \t- 5432
    \tvolumes:
        \t- data/postgresql:/var/lib/postgresql/data
    \tnetworks:
       \t- dockergenfile
`;

export const MongoService = `
\tmongodb_database:
    \timage: mongo
    \trestart: always
    \tenvironment:
        \tMONGO_INITDB_DATABASE: test_db
        \tMONGO_INITDB_ROOT_USERNAME: root
        \tMONGO_INITDB_ROOT_PASSWORD: root
    \tports:
        \t- 27017:27017
    \texpose:
        \t- 27017
    \tvolumes:
        \t- data/mongodb:/data/db
    \tnetworks:
        \t- dockergenfile
`;

export const RedisService = `
\tredis_database:
    \timage: redis:alpine
    \tvolumes:
        \t- /data/redis:/data
    \tnetworks:
        \t- dockergenfile
`;
