# BismuthAPI
API Doc and code samples for Bismuth cryptocurrency.

## Why Bismuth?

[Bismuth](https://github.com/hclivess/Bismuth) is way more than "just" another cryptocurrency.

Its open architecture allows for smooth dapps (distributed apps) development, and its Python codebase eases the adoption and comprehension of its internals.

To built upon Bismuth, you'll need at least a running node.

## The json-rpc API

A json-rpc server is available as a separate app. It's designed to be as bitcoind-compatible as possible.  
You'll find it at [Bismuth Json-RPC](https://github.com/EggPool/BismuthRPC) with its doc.

The json-rpc has the internal logic to create and keep track of multiple accounts and addresses.
It's first purpose was to be used by echanges, to ease the integration of Bismuth.

## The Native API

This is the API used by the nodes themselves, with some recent "api_" addons.  
This repo is dedicated to this native API doc and code samples, if you want to directly talk to the Bismuth nodes, whatever your dev language is.

See the "[Doc](Doc/)" directory for a quick start.

# Available client libraries

WIP:
* [Python client library](Python/) Available (reference)
* [PHP client library](PHP/) Available with demo app.
* [JS client library](JavaScript/) with tests and demo thanks to @gabidi.

# Related work

You may find the [BismuthEvents repo](https://github.com/EggPool/BismuthEvents) useful: it's event sourcing built upon Bismuth, using the Native api only.

