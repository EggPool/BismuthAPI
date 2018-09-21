CC = g++
CFLAGS=-O2 -Os -s -Wall
LDFLAGS=

all: demo
 
demo: demo.o
	$(CC) -o $@ $(CFLAGS) $^ $(LDFLAGS)

demo.o: demo.cpp BismuthNative.hpp
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -rf demo *.o 
