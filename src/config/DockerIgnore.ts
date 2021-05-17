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
`;
