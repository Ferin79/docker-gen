export const entryPoint = `
#!/bin/sh

set -e

python manage.py migrate --noinput
python manage.py collectstatic --noinput

uwsgi --socket :8000 --master --enable-threads --module PROJECT_NAME.wsgi
`;
