# breaker

Schnoor Protocol via Fiat-Shamir Transform for authentication - signup.

Store `publicKey` in database and on login `findOne(publicKey)`.

When logged in, store challenge in session.

## todo

1. Want zero knowledge on login. Instead of `findOne(publicKey)`, provide proof of "I know a witness x such that x=log(publicKey)"

2. Challenge should be checked on any action.

###### References

1. [Christian Becker](https://medium.com/@christian_becker/zero-knowledge-authentication-92016842563d)
