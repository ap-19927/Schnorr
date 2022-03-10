# breaker

Schnorr Protocol-ish under Fiat-Shamir Transform for signup and login using sjcl library.

generator `g`, 'publicN = g^n' unless otherwise noted.

## signup
On initial signup, client generates random `key`, `commitment` and computes
`challenge = hash(key,publicCommitment)`,
`publicChallenge = publicKey^challenge`, and
`response = challenge*key + commitment`.
Sends `publicChallenge`,
`publicCommitment` and
`publicResponse`
to server.
Server verifies if `publicResponse = publicChallenge*publicCommitment`

## login
Store hashed `publicKey` in database. On login `User.find()` along with the above verification process.

Using `passport-custom` to authenticate.

## issues
1. This app is only a test. It has not been formally reviewed as a security tool.

1. please excuse the poorly written code including the lack of comments.

1. client does verification and sends bool, rather than send points for server to multiply and verify.

2. sends `publicKey` in `POST`. Want to reveal less knowledge. Instead of `User.find()` in `passport-util.js`, provide proof of "I know a witness `key,publicKey` pair such that "key=log(publicKey)" without revealing the pair.


### References

1. [sjcl](https://github.com/bitwiseshiftleft/sjcl/)

4. [best-way-to-hash-two-values-into-one](https://crypto.stackexchange.com/questions/55162/best-way-to-hash-two-values-into-one)

3. [how-can-i-merge-typedarrays-in-javascript](https://stackoverflow.com/questions/14071463/how-can-i-merge-typedarrays-in-javascript)

5. [mongoose/find-all](https://masteringjs.io/tutorials/mongoose/find-all)

6. [why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty](https://stackoverflow.com/questions/32084571/why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty?noredirect=1&lq=1)

7. [what-callback-function-should-i-use-in-an-xmlhttprequest-to-render-the-response](https://stackoverflow.com/questions/42942176/what-callback-function-should-i-use-in-an-xmlhttprequest-to-render-the-response)

8. [hexStringToArrayBuffer](https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09)
