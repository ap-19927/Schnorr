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
const curve = sjcl.ecc.curves.c384;
const generator = curve.G;
const sch = (seed) => {
  /**
  key generation algo
  **/
  const keyGen = (s) => {
    let key;
    if(typeof s == 'object') key = s;
    else if(hexStringToTypedArray(s)===0) return {};
    else key = hexStringToTypedArray(s);

    key = sjcl.bn.fromBits(key);
    const publicKey = generator.mult(key);
    console.log('key',key)
    return {key: key, publicKey: publicKey}
  }

  /**
  signing algo
  **/
  const hash = (mess,commit) => {
    console.log('hashmessage',mess.x)
    a = mess.x.limbs
    b = mess.y.limbs
    c = commit.x.limbs
    d = commit.y.limbs
    const preImage = new Int16Array(a+b+c+d+4); // https://stackoverflow.com/questions/14071463/how-can-i-merge-typedarrays-in-javascript
    preImage.set(a.length,a, b.length,b, c.length,c, d.length,d); //https://crypto.stackexchange.com/questions/55162/best-way-to-hash-two-values-into-one
    return sjcl.bn.fromBits(sjcl.hash.sha256.hash(preImage));
  }
  const sign = (message,key) => {
    const randomness = sjcl.bn.fromBits(crypto.getRandomValues(new Uint32Array(32)))
    const commitment = generator.mult(randomness)

    //challenge = hash(publicKey,commitment)
    const challenge = hash(message,commitment)

    // response = challenge*key + randomness
    const response = challenge.mul(key).add(randomness);

    return {commitment: commitment, response: response }
  }


  /**
  verification algo
  **/
  //calculate challenge = hash(publicKey,commitment)
  //check if generator^response = publicKey^challenge*commitment
  const verify = (signature, message, publicKey) => {
    const res = generator.mult(signature.response)
    const challenge = hash(publicKey,signature.commitment)
    const check = publicKey.mult2(challenge,1,signature.commitment)

    for(i=0;i<publicResponse.x.limbs.length;i++) {
      if(res.x.limbs[i]!==check.x.limbs[i] || res.y.limbs[i]!==check.y.limbs[i]) return false
    }
    return true
  }


  const keys = keyGen(seed);
  const signature = sign(keys.publicKey,keys.key)
  const verification = verify(signature,keys.publicKey,keys.publicKey)
  return { key: keys.key,
          public: {
            publicKey: keys.publicKey.x.toString(),
            verify: verification,
          },
        }
}

function redirect(res){
  window.location = res;
}
