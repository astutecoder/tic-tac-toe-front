FROM node:12

# set working directory
WORKDIR /ttt-front

ENV PATH /ttt-front/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]