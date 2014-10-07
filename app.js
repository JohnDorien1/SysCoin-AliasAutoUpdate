// Edit the lines in this block to match your local config. DO NOT EDIT BELOW THIS BLOCK!

var client = new syscoin.Client({
  host: 'localhost',
  port: 8368,
  user: 'username',
  pass: 'password',
  timeout: 180000
});

var islocked = 0; // Change to 1 if your wallet is encrypted
var islockedpw = 'mywalletpass';  // Change this to your wallet passphrase if encrypted


/////////////////// END OF CONFIG ///////////////

var aliases;

client.aliasList(function(err, result, resHeaders){
  if (err) return console.log(err);
  aliases = result;
  console.log(aliases);  // Debug print for development
});

for(var i = 0; i < aliases.length; i++){
  if(aliases[i].expiry <= 100){
    client.aliasUpdate(aliases[i].name, aliases[i].value, function(err,result,resHeaders){
      if (err) return console.log(err);
      console.log(result);
    });
  };
};
