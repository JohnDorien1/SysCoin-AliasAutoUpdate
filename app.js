// Edit the lines in this block to match your local config. DO NOT EDIT BELOW THIS BLOCK!
var syscoin = require('syscoin');

var client = new syscoin.Client({
  host: 'localhost',
  port: 8368,
  user: 'username',
  pass: 'password',
  timeout: 180000
});

var islocked = 0; // Change to 1 if your wallet is encrypted
var islockedpw = 'mywalletpass';  // Change this to your wallet passphrase if encrypted

var updateall = 1; // change to 0 and update the array next line in case you want only certain aliases to be updated
var specaliases = ["enter", "all", "aliases", "here"]; // case sensitive!!!

/////////////////// END OF CONFIG ///////////////

var aliases = '';
var aliasinf = ''

client.aliasList(function(err, result, resHeaders){
  if (err) return console.log(err);
  aliases = result;
  console.log('Result of aliases: ', aliases);  // Debug print for development
  if(updateall == 0){
    
  }
  for(var i = 0; i < aliases.length; i++){
    if(aliases[i].expires_in <= 100){
      client.aliasInfo(aliases[i].name, function(err, result, resHeaders){
        aliasinf = result;
        var check = specaliases.indexOf(aliasinf.name);
        if(updateall == 0 && check != (-1)){
          if(islocked == 1) client.walletpassphrase(islockedpw, '1000', function(err,result,resHeaders){});// Do the wallet unlock clause here (one line, if locked --> unlock)
          client.aliasUpdate(aliasinf.name, aliasinf.value, function(err,result,resHeaders){
            if (err) return console.log(err);
            console.log(result);
          });
          if(islocked == 1) client.walletlock();
        };
        if(updateall == 1){
          if(islocked == 1) client.walletpassphrase(islockedpw, '1000', function(err,result,resHeaders){});// Do the wallet unlock clause here (one line, if locked --> unlock)
          client.aliasUpdate(aliasinf.name, aliasinf.value, function(err,result,resHeaders){
            if (err) return console.log(err);
            console.log(result);
          });
          if(islocked == 1) client.walletlock();
        };
      });
    };
  };
});


