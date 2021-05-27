/* eslint-disable no-useless-escape */

export const Nginx = `
server {
    listen PROJECT_PORT;
    index index.php index.html;
    root /var/www/public;
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    location / {
        try_files $uri /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}

`;

export const NginxDockerFile = `
FROM nginx:1.19.0-alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY public /var/www/public
`;
