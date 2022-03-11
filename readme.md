# breaker

Schnorr Signature for signup and login using sjcl library.

generator `g`, group `c384`

## Schnorr signature (client side)

#### `keyGen(key)`

outputs

 `publicKey = g^key`.

#### `sign(message,key)`

outputs

random `randomness`,

`commitment = g^randomness`,

`challenge = hash(message,commitment)`,

`response = challenge*key + randomness`.

#### `verify(commitment, response, message, publicKey)`

outputs

`challenge = hash(message,commitment)`

`g^response === (publicKey^challenge)*commitment`

## signup

Schnorr signature with `keyGen(random)`

store `hash(salt,publicKey)` in db.

## login
Schnorr signature with `keyGen(form)`

`User.find(keyGen(form))`

`passport-custom` to authenticate.

## issues
1. This is not a security tool.

1. please excuse the poorly written code including the lack of comments.

1. `verify` is not done server side but client side.

2. sends `publicKey` in `POST`. Want to reveal less knowledge. Instead of `User.find()` in `passport-util.js`, provide proof of "I know a witness `key,publicKey` pair such that "publicKey in db" and "key=log(publicKey)" without revealing the pair.

### References

1. [sjcl](https://github.com/bitwiseshiftleft/sjcl/)

4. [best-way-to-hash-two-values-into-one](https://crypto.stackexchange.com/questions/55162/best-way-to-hash-two-values-into-one)

3. [how-can-i-merge-typedarrays-in-javascript](https://stackoverflow.com/questions/14071463/how-can-i-merge-typedarrays-in-javascript)

5. [mongoose/find-all](https://masteringjs.io/tutorials/mongoose/find-all)

6. [why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty](https://stackoverflow.com/questions/32084571/why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty?noredirect=1&lq=1)

7. [what-callback-function-should-i-use-in-an-xmlhttprequest-to-render-the-response](https://stackoverflow.com/questions/42942176/what-callback-function-should-i-use-in-an-xmlhttprequest-to-render-the-response)

8. [hexStringToArrayBuffer](https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09)
