# Sample commands

Memo for exchanges willing to use the native Bismuth API.  
> Note that an *almost* bitcoind-compatible [Bismuth json-rpc server](https://github.com/EggPool/BismuthRPC)  is also available and may ease your integration.

See [commands](commands_reference.md) for further command references.

*WIP*

## Create a new address


## Get a block by its height with its tx


## Get last block Height


## Construct and sign a tx
These options may depend on your custom infrastructure, key management and security procedures.

### Option1 (more secure)
Send All details to the node, including privkey

### Option2 (maybe less secure)
Construct and sign locally, then ask the node to insert the transaction in mempool.


## Broadcast a tx


## Get tx details from it's txid


## Get balances from addresses


# More

## Polling for new transactions
