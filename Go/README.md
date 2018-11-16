# Go library for accessing the Bismuth Native API access

Go client library for accessing the the [Bismuth Native API](https://github.com/EggPool/BismuthAPI).

Demonstrates the use of a simple Go client library. It require Go version 1.10 or greater. See [Go Download](https://golang.org/dl/).

* [bismuth/BismuthNative.go](bismuth/BismuthNative.go) : Go Bismuth Native API Client library

* [demo.go](demo.go) : A simple demo app, showing a few simple commands. It's needs a running node.

## Notes

To compile and run create a `BismuthAPI` package directory inside your workspace ((see [The GOPATH environment variable](https://golang.org/doc/code.html#GOPATH))).

The command `go env GOPATH` prints the effective current GOPATH; it prints the default location if the environment variable is unset.
> => go env GOPATH

We'll use  `BismuthAPI`  as base path. Create a directory inside your workspace in which to keep source code.
> mkdir -p $GOPATH/src/BismuthAPI

In `$GOPATH/src/BismuthAPI`

* to build, we can do this using `go build -o bin/demo.exe demo.go`
* Execute the built demo binary directly with `./bin/demo.exe` (needs a running node)

With Windows and `nmake`, you can use `Makefile.Win`.

`nmake -f Makefile.win`


### Patches

Anybody can contribute to development. If you are contributing a source code change, use a merge request of a Git branch.
