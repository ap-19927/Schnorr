# breaker

Schnorr Protocol-ish under Fiat-Shamir Transform for signup and login using sjcl library.

generator `g`, 'publicN = g^n' unless otherwise noted.

## signup
On initial signup, client generates random `key`, `commitment` and computes `challenge = hash(key,publicCommitment)`, `publicChallenge = publicKey^challenge`, and `response = challenge*key + commitment`. Sends `publicChallenge`, `publicCommitment` and `publicResponse` to server and server verifies if `publicResponse = publicChallenge*publicCommitment`

##login
Store hashed `publicKey` in database and on login `User.find()` along with the above verification process.

Using `passport-custom` to authenticate.

## issues

1. client does verification and sends bool, rather than send points for server to multiply and verify.

2. sends `publicKey` in `POST`. Is it possible to not store `publicKey`? Instead of `User.find()` in `passport-util.js`, provide proof of "I know a witness `key` such that "key=log(publicKey)"

4. `login` and `signup.js` are not dry

### References

1. [sjcl](https://github.com/bitwiseshiftleft/sjcl/)

4. (https://crypto.stackexchange.com/questions/55162/best-way-to-hash-two-values-into-one)

5. (https://masteringjs.io/tutorials/mongoose/find-all)

6. (https://stackoverflow.com/questions/32084571/why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty?noredirect=1&lq=1)

7. (https://stackoverflow.com/questions/42942176/what-callback-function-should-i-use-in-an-xmlhttprequest-to-render-the-response)
