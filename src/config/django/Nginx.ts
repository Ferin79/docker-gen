export const Nginx = `
upstream hello_django {
    server web:PROJECT_PORT;
}

server {

    listen 80;

    location / {
        proxy_pass http://hello_django;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location /staticfiles/ {
        alias /home/app/web/staticfiles/;
    }

    location /mediafiles/ {
        alias /home/app/web/mediafiles/;
    }

}
`;

export const NginxDockerFile = `
FROM nginx:1.19.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
`;
