# Sample commands

Memo for exchanges willing to use the native Bismuth API.  
> Note that an *almost* bitcoind-compatible [Bismuth json-rpc server](https://github.com/EggPool/BismuthRPC)  is also available and may ease your integration.

See [commands](commands_reference.md) for further command references.

*WIP*

## Create a new address

Command "[Keygen](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#keygen)" returns [privkey, pubkey, address]

> Note: creating a new address is entropy and time intensive. If you plan to create a large # of addresses, it may be good to have several nodes running, so you can use one for address generation, and not slow down the regular tx polling.  You can also use local python scripts.


## Get a block by its height with its tx

Command "[blockget](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#blockget)" returns all the tx of a given block.


## Get last block Height

Command "[difflast](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#difflast)" returns latest block height and latest diff.  
Or
Command "[statusjson](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#statusjson)" returns latest block along with more info.


## Construct and sign a tx
These options may depend on your custom infrastructure, key management and security procedures.

### Option1 (more secure)
Construct and sign locally, then ask the node to insert the transaction in mempool.

* Use a local python script (see send_nogui.py as a starting point - adapted sample will come) to build a signed tx locally
* Command "[mpinsert](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#mpinsert)" inserts a signed tx in the node's mempool.

### Option2 (maybe less secure)
Send All details to the node, including privkey

Command "[txsend](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#txsend)" takes all input parameters and inserts the tx in the node's mempool.

## Broadcast a tx

Command "[mpinsert](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#mpinsert)" inserts a signed tx in the node's mempool.

## Get tx details from it's txid

Command "[api_gettransaction](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#api_gettransaction)" returns full details from a given transaction.

## Get balances from addresses

Command "[api_listbalance](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#api_listbalance)" returns all balances with minconf from a given addresses list.

See also "[api_getbalance](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#api_getbalance)" for the total balance of an adresses list only.


# More

## Get Status info

Command "[statusjson](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#statusjson)" returns several info from the running node.

## Polling for new transactions

(wip)
