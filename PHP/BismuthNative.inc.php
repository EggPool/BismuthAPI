<?php

/**
 * PHP client library for Bismuth Native API
 * (c) 2018 EggPool.Net
 *
 * @package BismuthAPI
 * @author @EggPool
 *
 * WIP, do NOT use yet
 *
 */

class BismuthNative {

    private $version = '1.0.0';
    private $server;
    private $port;
    private $verbose:
    private $socket;

    public function __construct($server='127.0.0.1', $port=5658, $verbose=false) {
        $this->server = $server;
        $this->port = $port;
        $this->verbose = $verbose
        $this->socket = false;
        $this->check_connection();
    }

    protected function check_connection(){
        // Check connection state and reconnect if needed.
        if (!$this->socket) {
            try {
                if ($this->verbose) {
                    print('Connecting to '.$this->server.':'.$this->port."\n");
                }
                $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
                socket_connect($this->socket, $this->server, $this->port);
            } catch (Exception $e) {
                $this->socket = false;
                print("Connections: Error ".$e->getMessage());
            }
        }
    }

}