var readLineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/cipher.proto"
var packageDefinition = protLoader.loadSync(PROTO_PATH)
var cipher_proto = grpc.loadPackageDefinition(packageDefinition).cipher
var client = new cipher_proto.CipherService("0.0.0.0:40001", grpc.credentials.createInsecure());

var input = readLineSync.question("Enter some text to encrypt: ")
var shift = readLineSync.question("Enter a number to shift by: ")

try {
    client.encrypt({input: input, shift: shift}, function(error, response) {
        try {
            if(response.message) {
                console.log(response.message)
            } else {
                console.log(`The encrypted message is: ${response.result}`)
            }
        } catch(e) {
            console.log("could not connect to server")
        }
    })
} catch(e) {
    console.log("An error occured")
}
