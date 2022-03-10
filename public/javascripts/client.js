/**
 * Convert a hex string to an ArrayBuffer.
 *
 * @param {string} hexString - hex representation of bytes
 * @return {ArrayBuffer} - The bytes in an ArrayBuffer.
 https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09
 */
function hexStringToTypedArray(hexString) {
    // remove the leading 0x
    hexString = hexString.replace(/^0x/, '');

    // ensure even number of characters
    if (hexString.length % 8 != 0) {
        //console.log('WARNING: expecting an even number of characters in the hexString');
        return 0
    }

    // check for some non-hex characters
    var bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
        //console.log('WARNING: found non-hex characters', bad);
        return 0
    }

    // split the string into 8-tuples of octets
    var pairs = hexString.match(/[\dA-F]{8}/gi);

    // convert the octets to integers
    var integers = pairs.map(function(s) {
        return parseInt(s, 16);
    });

    var array = new Uint32Array(integers);
    //console.log(array);

    return array;
}

const sch = (seed) => {
  const curve = sjcl.ecc.curves.c384;
  const generator = curve.G;
  const hash = sjcl.hash.sha256.hash;
  let key;
  //console.log('key',seed)
  if(typeof seed == 'object') key = seed;
  else if(hexStringToTypedArray(seed)===0) return {};
  else key = hexStringToTypedArray(seed);
  //console.log('key',key)
  key = sjcl.bn.fromBits(key);
  //console.log('key',key)
  const publicKey = generator.mult(key);
  //console.log('publicKey',publicKey)

  const commitment = sjcl.bn.fromBits(crypto.getRandomValues(new Uint32Array(32)))
  const publicCommitment = generator.mult(commitment)

  const a = key.limbs
  const b = publicCommitment.x.limbs
  const c = publicCommitment.y.limbs
  const preImage = new Int8Array(a+b+c+3); // https://stackoverflow.com/questions/14071463/how-can-i-merge-typedarrays-in-javascript
  preImage.set(a.length,a, b.length,b, c.length,c); //https://crypto.stackexchange.com/questions/55162/best-way-to-hash-two-values-into-one

  // challenge = hash(key,publicCommitment)
  const challenge = sjcl.bn.fromBits(hash(preImage));
  const publicChallenge =  publicKey.mult(challenge)

  // response = challenge*key + commitment
  const response = challenge.mul(key).add(commitment);
  const publicResponse = generator.mult(response);

  //check if publicResponse = publicChallenge*publicCommitment
  const verify = (publicResponse,publicChallenge,publicCommitment) => {
    const publicChallengeTimesPublicCommitment = publicChallenge.mult2(1,1,publicCommitment)
    for(i=0;i<publicResponse.x.limbs.length;i++) {
      if(publicResponse.x.limbs[i]!==publicChallengeTimesPublicCommitment.x.limbs[i] || publicResponse.y.limbs[i]!==publicChallengeTimesPublicCommitment.y.limbs[i]) return false
    }
    return true
  }
  return { key: key,
          public: {
            // publicResponse: {x: publicResponse.x.limbs, y: publicResponse.y.limbs},
            // publicChallenge: {x: publicChallenge.x.limbs, y: publicChallenge.y.limbs},
            // publicCommitment: {x: publicCommitment.x.limbs, y: publicCommitment.y.limbs},
            // publicKey: {x: publicKey.x.limbs, y: publicKey.y.limbs},
            publicKey: publicKey.x.toString(),
            verify: verify(publicResponse,publicChallenge,publicCommitment),
          },
        }
}
function redirect(res){
  window.location = res;
}
