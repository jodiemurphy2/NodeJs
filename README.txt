Proto Implementation:
- create proto file for cipher
- has 1 service: encrypt
- accepts a string input and a number shift
- returns a number and message 

Server Setup:
- npm init
- npm install @grpc/grpc-js
- npm install @grpc/proto-loader
- move protos folder into server folder
- create app.js and change script to start node start
- create code that uses proto to accept requests from the client and sends responses back
- npm start to run

Client Setup:
- npm init
- npm install @grpc/grpc-js
- npm install @grpc/proto-loader
- npm install readline-sync
- copy protos folder into client folder
- create app.js and change script to start node start
- create code that uses proto to send requests to the server and receive responses back
- npm start to run
- enter string to be encrypted and the shift number to be used by the cipher
- receive the encrypted text back as a response from the server
