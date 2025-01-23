var grpc = require("@grpc/grpc-js")
var protLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/cipher.proto"
var packageDefinition = protLoader.loadSync(PROTO_PATH)
var cipher_proto = grpc.loadPackageDefinition(packageDefinition).cipher;

function caesarCipher(input, shift) {
    
    var result = '';
    for(var i = 0; i < input.length; i++){
        var charKey = input[i].charCodeAt();
        //lower case letters
        if(charKey > 96 && charKey < 123){
            //add shift value (use % 26 to account for shift values greater than 26 (num letters in alphabet))
            charKey += shift % 26;
            //wrap back around for if character passes z
            if(charKey > 122){  
                charKey = (charKey - 122) + 96;
            }
        }
        //upper case letters
        if(charKey > 64 && charKey < 91){
            //add shift value (use % 26 to account for shift values greater than 26 (num letters in alphabet))
            charKey += shift % 26;
            //wrap back around for if character passes z
            if(charKey > 90){  
                charKey = (charKey - 90) + 64;
            }
        }
        result += String.fromCharCode(charKey);
    }
    return result;
}

function encrypt(call, callback){
    
    try{
        var input = call.request.input
        var shift = call.request.shift
        if(typeof(input) == "string" && !isNaN(shift)) {
            var result = caesarCipher(input, shift)
            callback(null, {
                message: undefined,
                result: result
            })
        } else {
            callback(null, {
                message: "Incorrect input entered. Try again."
            })
        }
    } catch(e) {
        callback(null, {
            message: "An error occured during computation"
        })
    }
}

var server = new grpc.Server()
server.addService(cipher_proto.CipherService.service, { 
    encrypt: encrypt,
})
server.bindAsync("0.0.0.0:40001", grpc.ServerCredentials.createInsecure(), function(){})