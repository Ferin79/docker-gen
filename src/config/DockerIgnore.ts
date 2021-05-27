export const GeneralDockerIgnore = `
# Items that don't need to be in a Docker image.
# Anything not used by the build system should go here.
Dockerfile*
docker-compose*
.dockerignore
README.md

# Artifacts that will be built during image creation.
build
dist
.next
node_modules

# Git Files
.gitignore
.git

# Other
LICENSE
.vscode
npm-debug.log
*.pyc
*.pyo
*.mo
*.db
*.css.map
*.egg-info
*.sql.gz
.cache
.project
.idea
.pydevproject
.idea/workspace.xml
.DS_Store
.sass-cache
.vagrant/
__pycache__
env
logs
stats
vendor
storage/framework/cache/**
storage/framework/sessions/**
storage/framework/views/**
`;
