# Bismuth Protocol, low level

(code exemples are in python)

## Raw sockets

Bismuth uses raw sockets on default port 5658 (see [config.txt](config_txt.md)).  
The messages are utf-8 strings only, no raw binary.

## Data

Python structures to be sent are json encoded  
`sdata = str(json.dumps(data))`

## Header

An header prefixes all messages. It's always 10 chars long, left padded with '0's and represents the length of the following data in decimal (base 10), as a string.  
`header = str(len(sdata)).encode("utf-8").zfill(10)`

If the message is some block height, like the json string '566123' then 
* its size is 8 (6 char of the value, plus 2 chars for the json quotes)  
* the header would be the string 0000000008

The full message is then the string `000000008'566123'`

## Receiving a message

* read 10 bytes to build the header, convert to int, get the data length "datalen"
* disconnect if the header is not valid (not a string matching [0-9]{10})
* wait until "datalen" bytes are read from the socket or it times out, built the data string
* json decode the data
