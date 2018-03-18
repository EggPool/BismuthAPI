# Bismuth Native API command reference

This is a documented subset of the commands the nodes currently understand.

*WIP*

# Native Commands

## statusjson
> takes no parameter, returns a dict

Returns a dict with main status info, including protocol and node version, current blockheight, current diff, thread count, uptime, consensus and peer count.
Prefered way of getting most info over a single call.

## diffget
> takes no parameter, returns a list

Returns diff, diff adjusted (for the next block)

## difflast
> takes no parameter, returns a list

Returns [last block_height, last diff]

## addvalidate
> takes an address, returns a string
*May be deprecated soon or evolve*

return either 'valid' or 'invalid'. Only does a format check.
TODO

## keygen

## txsend
*NOT* secure, do not use

## mpinsert

## addlist

## listlim

## addlistlim

## blockget


# Extra API_ Commands

This commands are not used by nodes themselves, but are available to third party clients.

## api_ping 
> takes no parameter, returns a string

Does nothing except keep the socket open. API client wxilling a persistent connection can send an api_ping every 30 sec at most.  
The node will answer with a single string, 'api_pong'.

## api_getaddressinfo
> takes an address, returns a dict

Returns a dict with  
* known: Did that address appear on a transaction?  
* pubkey: The pubkey of the address if it signed a transaction

## api_getblocksince
> takes a block height, returns a list of list

Returns the full blocks and transactions following a given block_height
Returns at most transactions from 10 blocks (the most recent ones if it truncates)

## api_getbalance
> takes a list of addresses, the mininmum number of confirmations needed and returns a float.
Even if you want the balance for a single address, you have to ask it as a list [address]

Returns total balance for a list of addresses and minconf  
BEWARE: this is NOT the bitcoind json rpc getbalance (that get balance for an account, not an address)

## api_getreceived
> takes a list of addresses, the mininmum number of confirmations needed and returns a float.
Even if you want the received total for a single address, you have to ask it as a list [address]

Returns the total amount *received* for all given address with minconf

## api_listreceived
> takes a list of addresses, the mininmum number of confirmations needed and returns a dict of {address: total_received}.
Even if you want the received total for a single address, you have to ask it as a list [address]

Returns the total amount *received* for each given address with minconf

## api_listbalance
> takes a list of addresses, the mininmum number of confirmations needed and returns a dict of {address: total_balance}.

Returns the total balance for each given address with minconf

## api_gettransaction
> takes a transaction_id, the format to use (false=raw, true=json) and returns a list or dict representing the whole transaction data.

returns the transaction detail for a single transaction id. format is a boolean, returns as json format. if format is false, sends a raw list.

## api_getpeerinfo
> takes no parameter, returns a list
Not stable

