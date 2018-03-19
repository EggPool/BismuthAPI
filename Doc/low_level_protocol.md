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

# Reference code 

Python, from official code, stripped down to the minimum

```
import json
import socket

# Logical timeout
LTIMEOUT = 45
# Fixed header length
SLEN = 10


def send(sdef, data, slen=SLEN):
    sdef.settimeout(LTIMEOUT)
    sdata = str(json.dumps(data))
    # Make sure the packet is sent in one call
    res = self.sdef.sendall(str(len(sdata)).encode("utf-8").zfill(slen)+sdata.encode("utf-8"))
    # send will raise an error if socket is broken


def receive(sdef, slen=SLEN):
    sdef.settimeout(LTIMEOUT)
    try:
        data = sdef.recv(slen)
        if not data:
            raise RuntimeError("Socket EOF")
        data = int(data)  # receive length
    except socket.timeout as e:
            return "*"
            # no message for timeout sec, ping will check the socket
    try:
        chunks = []
        bytes_recd = 0
        while bytes_recd < data:
            chunk = sdef.recv(min(data - bytes_recd, 2048))
            if not chunk:
                raise RuntimeError("Socket EOF2")
            chunks.append(chunk)
            bytes_recd = bytes_recd + len(chunk)
        segments = b''.join(chunks).decode("utf-8")
        return json.loads(segments)
    except Exception as e:
        raise RuntimeError("Connections: {}".format(e))
```

# Exemples buffer

## statusjson

Sends the binary string `0000000012"statusjson"`  
Note the quotes around the text command, raising len to 12 chars.

## blockget(558742)

Each parameter is sent as a single message. Here, this leads to 2 messages/buffers:  
`0000000010"blockget"`
`0000000006558742`

> requested block height is an int, not a string, Then it does not have quotes.

## More buffers

If you're writing your own implementation, you can use the [Python/demo.py](../Python/demo.py) app, with "RAW" set to "True" to print out and compare raw buffers.

