const fs = require('fs');
const crypto = require('crypto');

// Given hash
const hash = '5e7d28e2cfff93edefb2d15abad07ec5';

// Function to generate hash with a specified algorithm
function generateHash(text, algorithm) {
    return crypto.createHash(algorithm).update(text).digest('hex');
}

// Cracking the hash with a specified algorithm
function crackHash(targetHash, algorithm, wordlist) {
    for (const word of wordlist) {
        if (generateHash(word, algorithm) === targetHash) {
            return word;
        }
    }
    return null; // Return null if hash cannot be cracked
}

// Read wordlist from a text file
function readWordlist(filename) {
    return fs.readFileSync(filename, 'utf8').split('\n').map(word => word.trim());
}

// Cracking the given hash with different algorithms
const algorithms = ['md5', 'sha1', 'sha256', 'sha512', 'ripemd160', 'whirlpool', 'sha3-256', 'sha3-512', 'blake2b512', 'blake2s256']; // List of algorithms to try
const wordlist = readWordlist('10-million-password-list-top-1000000.txt');

let crackedPassword = null;

for (const algorithm of algorithms) {
    crackedPassword = crackHash(hash, algorithm, wordlist);
    if (crackedPassword) {
        console.log(`Hash cracked using ${algorithm.toUpperCase()}! The password is: ${crackedPassword}`);
        break; // Stop loop if the hash is cracked
    }
}

if (!crackedPassword) {
    console.log('Failed to crack the hash.');
}
