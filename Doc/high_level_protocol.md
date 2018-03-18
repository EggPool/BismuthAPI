# Bismuth Native API, High level protocol

Some commands are naked: `blocklast` `api_ping`  
Others require a parameter `balanceget` (needs an address)  

## Each parameter is a message of its own.

* first send the command itself (with its low level header)
* then send the parameter(s), each as a message, with its header.
* then read the result(s)

## Returns 
Commands can also return one or more messages as a result.

So, the client has to take care of reading the expected number of messages depending on the function.
