const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;
const RANDOM_CHANCE = 2; // Random chance is 1 / RANDOM_CHANCE (e.g. 10000 = a 1 in 10000 chance if being a real one)
const KEY_SUBSTRING_LENGTH = 5;
const real_key_file = "keys.txt"


function generateKey(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function isRealKey() {
    var result = Math.floor(Math.random() * RANDOM_CHANCE);

    if(result == 1) {
        return true;
    }

    return false;
}

function getRandomRealKey() {
    const data = fs.readFileSync('./keys.txt', 'utf8');

    var keys = [];

    data.split(/\r?\n/).forEach(line =>  {
        keys.push(line)
    });

    var index = Math.floor(Math.random() * keys.length);

    return keys[index];
};

app.get('/get_key', (req, res) => {
    var result;

    if(!isRealKey()) {
        result = `${generateKey(KEY_SUBSTRING_LENGTH)}-${generateKey(KEY_SUBSTRING_LENGTH)}-${generateKey(KEY_SUBSTRING_LENGTH)}`;
    }
    else {
        result = getRandomRealKey();
    }

    res.send(result);
});

app.listen(port, () => console.log(`Keygen app listening on port ${port}!`))