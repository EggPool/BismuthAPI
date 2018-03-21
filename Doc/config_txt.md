*WIP* 

# Configuring your Bismuth Node

## config.txt and config_custom.txt

config.txt is provided by the setup and shouldn't be tampered with. Extra parameters may come with updates, as well as mainnnet versions changes.  
Do not edit.  
To change some settings, create a config_custom.txt text file, and add your custom settings there.  
If a setting is in both files, the custom version will take other.  
You don't have to copy all the settings, only the ones you want to change.

## Important values to check

The [default config.txt file](https://github.com/hclivess/Bismuth/blob/master/config.txt) is ok for a simple wallet node.  
If you are an exchange, or rely on the node for some app, then you should adjust some params.

### Sample config_custom.txt for a network node

An online node, that supports the network.  

> config_custom.txt
```
allowed=any
# You can use 50 (min) to 200+ for thread limit
thread_limit=100
```

### Sample config_custom.txt for an Exchange node

An utility node, maximizing connectivity and security.

> config_custom.txt
```
allowed=internal_ip_1,internal_ip_2
banlist=custom,list,of,ip,to,blacklist,ask,the,devs
whitelist=ip,of,trusted,nodes,ask,the,devs
reveal_address=no
# Depending on your resources, 200 may be ok too.
thread_limit=100
```

### Sample config_custom.txt for a miner

A miner node, maximizing response time.

> config_custom.txt
```
pause=1
allowed=any
# 50 min, up to 200
thread_limit=50
```

## Health check

The ["statusjson" API command](https://github.com/EggPool/BismuthAPI/blob/master/Doc/commands_reference.md#statusjson) may prove helpful to monitor your node.  
See "connections" and "consensus_percent" fields.  
In order to force a banlist reset, a restart is needed. You can restart on low connectivity, or proactively, like once a day.

## Exchanges: whitelisting your node(s) and addresses

Exchanges can provide their node's IP to the devs for whitelisting in the devs nodes.  
The ips will be kept confidential. This ensures the exchange node can't be banned by the network.

# OS config

See - old but still ok - [Setup a stable Bismuth Node](http://www.eggpool.net/pdf/bismuth-open-files.pdf)
