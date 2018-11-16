package BismuthNative

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"reflect"
	"strconv"
	"strings"
	"time"
)

type bismuthNative struct {
	tcpAddr   string
	server    string
	port      int
	socketErr error
	socketAPI net.Conn
}

func (this *bismuthNative) cnxCheck() {
	if this.socketAPI == nil {
		this.socketAPI, this.socketErr = net.Dial("tcp", this.tcpAddr)
		if this.socketErr != nil {
			log.Fatalln(this.socketErr)
		}

		this.socketErr = this.socketAPI.(*net.TCPConn).SetKeepAlive(true)
		if this.socketErr != nil {
			log.Fatalln(this.socketErr)
		}

		this.socketErr = this.socketAPI.(*net.TCPConn).SetKeepAlivePeriod(30 * time.Second)
		if this.socketErr != nil {
			log.Fatalln(this.socketErr)
		}
	}
}

func (this *bismuthNative) cnxIsClosed() {
	this.socketAPI.SetReadDeadline(time.Now())
	var one []byte
	if _, err := this.socketAPI.Read(one); err == io.EOF {
		log.Printf("Client disconnect: %s", this.socketAPI.RemoteAddr().String())
		this.socketAPI.Close()
		this.socketAPI = nil
	} else {
		var zero time.Time
		this.socketAPI.SetReadDeadline(zero)
	}
}

func (this *bismuthNative) send(message string) {
	this.cnxIsClosed()
	this.cnxCheck()
	_, this.socketErr = this.socketAPI.Write([]byte(message))
	if this.socketErr != nil {
		log.Printf("ERROR soccket send() [%s] message: %s", this.socketErr.Error(), message)
	}
}

func New(nodeServer string, nodePort int) bismuthNative {
	tcpAddr := strings.Join([]string{nodeServer, strconv.Itoa(nodePort)}, ":")
	bn := bismuthNative{tcpAddr, nodeServer, nodePort, nil, nil}
	bn.cnxCheck()

	return bn
}

func (this *bismuthNative) Close() {
	this.socketAPI.Close()
}

func (this *bismuthNative) Command(cmds ...interface{}) string {
	var socketMessage string
	var socketReceiveMessage, bJson []byte
	var socketLenReceiveMessage int

	for _, cmd := range cmds {
		rt := reflect.TypeOf(cmd)
		switch rt.Kind() {
		case reflect.Int:
			var cmdApi int = cmd.(int)
			socketMessage = fmt.Sprintf("%010v%d", len(strconv.Itoa(cmdApi)), cmdApi)
			this.send(socketMessage)
		case reflect.Bool:
			var cmdApi bool = cmd.(bool)
			if cmdApi == true {
				this.send("0000000004true")
			} else {
				this.send("0000000005false")
			}
		case reflect.String:
			var cmdApi string = cmd.(string)
			bJson, this.socketErr = json.Marshal(cmdApi)
			if this.socketErr != nil {
				log.Printf("ERROR JSON: %s", this.socketErr.Error())
			} else {
				socketMessage = string(bJson)
				socketMessage = fmt.Sprintf("%010v%s", strconv.Itoa(len(socketMessage)), socketMessage)
				this.send(socketMessage)
			}
		case reflect.Slice:
			itemsPtr := reflect.ValueOf(cmd)
			sliceItems, err := itemsPtr.Interface().([]string)
			if !err {
				log.Println("ERROR slice []string")
			}

			bJson, this.socketErr = json.Marshal(sliceItems)
			if this.socketErr != nil {
				log.Printf("ERROR JSON: %s", this.socketErr.Error())
			} else {
				socketMessage = string(bJson)
				socketMessage = fmt.Sprintf("%010v%s", strconv.Itoa(len(socketMessage)), socketMessage)
				this.send(socketMessage)
			}
		default:
			println("")
			log.Fatalln("Unknow paramater type: ", rt, "for BismuthAPI command")
		}
	}

	var nByte int
	var lengthSocketMessage []byte = make([]byte, 10)
	nByte, this.socketErr = this.socketAPI.Read(lengthSocketMessage)

	socketLenReceiveMessage, _ = strconv.Atoi(string(lengthSocketMessage[:nByte]))
	socketReceiveMessage = make([]byte, socketLenReceiveMessage)
	nByte, this.socketErr = this.socketAPI.Read(socketReceiveMessage)

	return string(socketReceiveMessage[:nByte])
}
