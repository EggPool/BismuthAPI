# C++ code for Bismuth Native API access

Demonstrates the use of a simple C++ client library. It require C++11 and  has been ported to and tested on the following platforms:

* Linux with GCC version 7.3.0 (Ubuntu 7.3.0-16ubuntu3)
* Windows 10 (64 bits) with MS Visual Studio 2015

[BismuthNative.hpp](BismuthNative.hpp) : C++ Client library

[demo.cpp](demo.cpp) : A simple demo app, showing a few simple commands. It's needs a running node.

## Notes

On Unix--like platforms, can be compiled using `g++`. See `Makefile` for usage.

On Windows, the primary build system is Visual Studio 2015 solution and can be compiled using `cl`. See `Makefile.Win` for usage.

### Unsupported compilers and platforms

Does not support too old or broken C++ compilers. It means it does not support any platform or compiler without decent C++11 support.

* Visual Studio prior to 2015
* GCC prior to 7.3

### Patches

Anybody can contribute to development. If you are contributing a source code change, use a merge request of a Git branch.
