FROM node:16

RUN mkdir -p /usr/angular

WORKDIR /usr/angular

COPY package*.json /usr/angular
RUN npm install

COPY . /usr/angular

#RUN npm run build
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ng serve --host 0.0.0.0
