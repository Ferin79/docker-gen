export const MySQLService = `
    mysql_database:
        image: mysql
        restart: always
        environment:
            MYSQL_DATABASE: test_db
            MYSQL_ROOT_PASSWORD: root
            MYSQL_ROOT_PASSWORD: root
        ports:
            - 3306:3306
        expose:
            - 3306
        volumes:
            - data/mysql:/var/lib/mysql
        networks:
            - dockergenfile
`;

export const MariaDBService = `
    mariadb_database:
        image: mariadb
        restart: always
        environment:
            MYSQL_DATABASE: test_db
            MYSQL_ROOT_PASSWORD: root
            MYSQL_ROOT_PASSWORD: root
        ports:
            - 3306:3306
        expose:
            - 3306
        volumes:
            - data/mariadb:/var/lib/mysql
        networks:
            - dockergenfile
`;

export const PostgreService = `
    postgresql_database:
        image: postgres:alpine
        restart: always
        environment:
            POSTGRES_DB: test_db
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
        ports:
            - 5432:5432
        expose:
            - 5432
        volumes:
            - data/postgresql:/var/lib/postgresql/data
        networks:
        - dockergenfile
`;

export const MongoService = `
    mongodb_database:
        image: mongo
        restart: always
        environment:
            MONGO_INITDB_DATABASE: test_db
            MONGO_INITDB_ROOT_USERNAME: root
            MONGO_INITDB_ROOT_PASSWORD: root
        ports:
            - 27017:27017
        expose:
            - 27017
        volumes:
            - data/mongodb:/data/db
        networks:
            - dockergenfile
`;

export const RedisService = `
    redis_database:
        image: redis:alpine
        volumes:
            - /data/redis:/data
        networks:
            - dockergenfile
`;
