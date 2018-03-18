# Bismuth formats and structures

*WIP*

## Address

An address is 56 hex characters, a-f being lowercase.
Matching regexp: `[abcdef0123456789]{56}`

> Exemple:

The address is in fact the hex encoded version of the pubkey sha224 hash.  
hex(sha224(pubkey.der))

## Transaction ID

A transaction ID is the first 56 characters of the transaction signature, a base 64 encoded buffer.
More than hex chars can then be found here. 

> Exemple: 

## Raw Transaction
(Such as returned by the native API)

> Exemple (json encoded): 

## Raw Block
(Such as returned by the native API)
A block is a list of transactions.  
At least, it does include the reward transaction (always the last one if there are several ones).

> Exemple (json encoded): 
