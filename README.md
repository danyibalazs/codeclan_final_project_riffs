# riffs
CodeClan's final project using the MERN stack.

## About

This is a full-stack web application for guitar musicians. The user can upload mp3 files (guitar riffs) and those are stored in the AWS S3 cloud storage. The reference (URL) and other informations stored in a Mongo database. In the app the user can browse the uploaded files, listen and download them.

## Used technologies, packages

- MongoDB, Mongoose
- Express
- React
- Node
- react-router-dom
- axios

## Run Application

1. Install Node.js
2. Install MongoDB and create a database called riffs
4. Create a .env folder in the root directory with the aws3 s3 informations
5. Run 'npm install' in both the root and client directory
6. Start the server and client with the 'npm run dev' command
7. Server: localhost:5000, Client: localhost:3000