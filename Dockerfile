FROM node:16.13-alpine3.12

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# increase watchers, for better development
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

# add app
COPY . ./

