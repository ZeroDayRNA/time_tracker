FROM node:18.3.0
WORKDIR /frontend
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm","run","dev","--host"]