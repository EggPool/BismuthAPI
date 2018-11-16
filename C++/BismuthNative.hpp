/**
 * C++ client library for Bismuth Native API
 *
 * @package BismuthAPI
 * @author @LeMoussel
 *
 */

#ifndef _BISMUTH_NATIVE_API_HPP
#define _BISMUTH_NATIVE_API_HPP

#ifdef _WIN32
    #include <winsock2.h>
    typedef int socklen_t;
	#pragma comment(lib, "ws2_32.lib")
#else
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #include <unistd.h>
    #define INVALID_SOCKET -1
    #define SOCKET_ERROR -1
    #define closesocket(s) close(s)
    typedef int SOCKET;
    typedef struct sockaddr_in SOCKADDR_IN;
    typedef struct sockaddr SOCKADDR;
#endif

#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <cstring>
#include <iostream> 
#include <sstream>
#include <iomanip>
#include <vector>
#include <iostream>
#include <iterator>

std::string escape_json(const std::string &s) 
{
    std::ostringstream o;
    for (auto c = s.cbegin(); c != s.cend(); c++) {
        switch (*c) {
        case '"': o << "\\\""; break;
        case '\\': o << "\\\\"; break;
        case '\b': o << "\\b"; break;
        case '\f': o << "\\f"; break;
        case '\n': o << "\\n"; break;
        case '\r': o << "\\r"; break;
        case '\t': o << "\\t"; break;
        default:
            if ('\x00' <= *c && *c <= '\x1f') {
                o << "\\u"
                  << std::hex << std::setw(4) << std::setfill('0') << (int)*c;
            } else {
                o << *c;
            }
        }
    }
    return o.str();
}

class BismuthNative 
{
    public:    
        ~BismuthNative();
        BismuthNative(const std::string nodeServer, int nodePort, bool verbose);
        template<typename... Args> std::string command(const char *t, Args... args);
        std::string command(const char *t, bool bRecv);
        template<typename... Args> std::string command(const std::string t, Args... args);
        std::string command(const std::string, bool bRecv);
        template<typename... Args> std::string command(int t, Args... args);
        std::string command(int t, bool bRecv);
        template<typename... Args> std::string command(std::vector<std::string> t, Args... args);
        std::string command(std::vector<std::string> t, bool bRecv);
        
      protected:
        void check_connection();

    private:
        const std::string version = "1.0.0";
        const std::string server;
        int port;
        bool verbose;
        SOCKET socketAPI;

        bool _send(const std::string data);
        std::string _receive();
};

template<typename... Args>
std::string BismuthNative::command(const char *t, Args... args) 
{
    this->command(t, false);
    return this->command(args...);
}
std::string BismuthNative::command(const char *t, bool bRecv = true) 
{
    std::string st(t);
    std::ostringstream socketMessage;

    socketMessage << std::setfill('0') << std::setw(10) << st.length()+2 << "\"" << escape_json(st) << "\"";
    if (this->_send(socketMessage.str())) 
    {
        if (bRecv)
        { 
            std::string result = this->_receive();
            if (result.length() == 0) std::cerr << "socket receive failed" << std::endl;
            return result;
        }
    }
    
    return "";
}
template<typename... Args>
std::string BismuthNative::command(const std::string t, Args... args) 
{
    this->command(t, false);
    return this->command(args...);
}
std::string BismuthNative::command(const std::string t, bool bRecv = true)
{
    std::ostringstream socketMessage;
    socketMessage << std::setfill('0') << std::setw(10) << t.length()+2 << "\"" << escape_json(t) << "\"";
    
    if (this->_send(socketMessage.str())) 
    {
        if (bRecv)
        { 
            std::string result = this->_receive();
            if (result.length() == 0) std::cerr << "socket receive failed" << std::endl;
            return result;
        }
    }
    
    return "";
}
template<typename... Args>
std::string BismuthNative::command(int t, Args... args) 
{
    this->command(t, false);
    return this->command(args...);
}
std::string BismuthNative::command(int t, bool bRecv = true)
{
    unsigned int number_of_digits = 0;
    int n = t;
    do {
        ++number_of_digits; 
        n /= 10;
    } while (n);

    std::ostringstream socketMessage;
    socketMessage << std::setfill('0') << std::setw(10) << number_of_digits << t;

    if (this->_send(socketMessage.str())) 
    {
        if (bRecv)
        { 
            std::string result = this->_receive();
            if (result.length() == 0) std::cerr << "socket receive failed" << std::endl;
            return result;
        }
    }
    
    return "";
}
template<typename... Args>
std::string BismuthNative::command(std::vector<std::string> t, Args... args) 
{
    this->command(t, false);
    return this->command(args...);
}
std::string BismuthNative::command(std::vector<std::string> t, bool bRecv = true)
{
    std::ostringstream socketMessage;
    std::string result;

    result = "[";
    for(std::vector<std::string>::iterator it = t.begin(); it != t.end(); ++it){
        result += "\"" + escape_json(*it) + "\"";
        if(std::distance(it,t.end()) > 1) result += ",";
    }
    result += "]";
    socketMessage << std::setfill('0') << std::setw(10) <<  result.length() <<  result;

    if (this->_send(socketMessage.str())) 
    {
        if (bRecv)
        { 
            std::string result = this->_receive();
            if (result.length() == 0) std::cerr << "socket receive failed" << std::endl;
            return result;
        }
    }
    
    return "";
}

BismuthNative::~BismuthNative()
{
    closesocket(this->socketAPI);
    #ifdef _WIN32
        WSACleanup();
    #endif    
}

BismuthNative::BismuthNative(const std::string nodeServer = "127.0.0.1", int nodePort=5658, bool verbose=false) 
    : server(nodeServer), port(nodePort), verbose(verbose), socketAPI(-1)
{
    #ifdef _WIN32
        WSADATA WSAData;
        WSAStartup(MAKEWORD(2,2), &WSAData);
    #endif

    this->check_connection();
}

void BismuthNative::check_connection()
{
    if (this->socketAPI == -1)
    {
        if (this->verbose) std::cout << "Connecting to " << this->server << ":" << this->port << std::endl;

    	if ((this->socketAPI = socket(AF_INET, SOCK_STREAM, 0)) == -1)
        {
            std::cerr << "socket(AF_INET, SOCK_STREAM, 0) failed" << std::endl;
			exit(EXIT_FAILURE);		
        }

        #ifdef _WIN32
            int timeoutRcvSocket = 15000;
            setsockopt(this->socketAPI, SOL_SOCKET, SO_RCVTIMEO, (char*)&timeoutRcvSocket, sizeof(timeoutRcvSocket));        
        #else
            struct timeval timeoutRcvSocket = { 15, 0 };
            setsockopt(this->socketAPI, SOL_SOCKET, SO_RCVTIMEO, (char *)&timeoutRcvSocket, sizeof(timeoutRcvSocket));
        #endif

        SOCKADDR_IN sin;
        sin.sin_addr.s_addr = inet_addr(this->server.c_str());
        sin.sin_family = AF_INET;
        sin.sin_port = htons(this->port);

		if (connect(this->socketAPI, (SOCKADDR*)&sin, sizeof(sin)) == SOCKET_ERROR) 
        {
			closesocket(this->socketAPI);
            std::cerr << "Socket connect() failed, Server: " << this->server << " Port: " << this->port << std::endl;
			exit(EXIT_FAILURE);		
		}         
    }
}

std::string BismuthNative::_receive()
{
    char lengthSocketMessage[10] = "";
    int socketBytes;
 
    socketBytes = recv(this->socketAPI, lengthSocketMessage, sizeof(lengthSocketMessage), 0);
    if (socketBytes < 1)
        return "";

    int socketLenMessage = atoi(lengthSocketMessage);
    std::vector<char> socketMessage(socketLenMessage);
    socketBytes = recv(this->socketAPI, &socketMessage[0], socketLenMessage, 0);
    if (socketBytes < 1)
        return "";

    std::string rcv; 
    rcv.append(socketMessage.cbegin(), socketMessage.cend());
    return rcv;
}

bool BismuthNative::_send(const std::string data)
{
	this->check_connection();

    if (this->verbose) std::cout << "Socket sent: " << data << std::endl;

    int socketBytes;
    socketBytes = send(this->socketAPI, data.c_str(), data.length(), 0);
    if (socketBytes < 1) 
    {
        std::cerr << "socket send: " << data << " failed" << std::endl;
        return false;
    } else return true;
}

#endif // _BISMUTH_NATIVE_API_HPP
