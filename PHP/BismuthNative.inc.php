<?php

/**
 * PHP client library for Bismuth Native API
 * (c) 2018 EggPool.Net
 *
 * @package BismuthAPI
 * @author @EggPool
 *
 */

class BismuthNative {

	private $version = '1.0.0';
	private $server;
	private $port;
	private $verbose;
	private $socket;

	public function __construct($server='127.0.0.1', $port=5658, $verbose=false) {
		$this->server = $server;
		$this->port = $port;
		$this->verbose = $verbose;
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
				$this->socket = socket_create(AF_INET, SOCK_STREAM, 0);
				//socket_set_block($this->socket);
				socket_set_option($this->socket, SOL_SOCKET, SO_SNDTIMEO, array("sec"=>10, "usec"=>0));
				socket_connect($this->socket, $this->server, $this->port);
			} catch (Exception $e) {
				$this->socket = false;
				print("Connections: Error ".$e->getMessage());
			}
		}
	}
	


	protected function _send($data, $retry=true) {
		/* Sends something to the server*/
		$this->check_connection();
		try {
			# Make sure the packet is sent in one call
			$sdata = json_encode($data);
			$header = str_pad(strlen($sdata), 10, '0', STR_PAD_LEFT);
			$all = $header.$sdata;
			$res = socket_write($this->socket, $all, 10+strlen($sdata));
			if ($this->verbose) {
				print("sent ".$all."\n");
			}
			return(true);
		} catch (Exception $e) {
			# send failed, try to reconnect
			# TODO: handle tries #
			$this->socket = false;
			if ($retry) {
				if ($this->verbose) {
					print("Send failed (".$e->getMessage()."), trying to reconnect.");
				}
				$this->check_connection();
			} else {
				if ($this->verbose) {
					print("Send failed (".$e->getMessage()."), not retrying.");
				}
				return(false);
			}
			try {
				$header = str_pad(len($sdata), 10, '0', STR_PAD_LEFT);
				$res = socket_write($this->socket, $header+$sdata, 10+len($sdata));
				return(true);
			} catch (Exception $e) {
				$this->socket = false;
				print("Send failed (".$e->getMessage().").");
			}
		 }
	}

	protected function  _receive() {
		/* Wait for an answer, for LTIMEOUT sec.*/
		$this->check_connection();
		$data = '';
		try {
			$got = socket_recv($this->socket, $data, 10, MSG_WAITALL); 
			//print("Got ".$got);
			if ($got < 10) {
				throw new Exception("Socket EOF");
			}
		} catch (Exception $e) {
			$this->socket = false; return("");
		}
		try {
			$chunks = "";
			$bytes_recd = 0;
			while ($bytes_recd < $data) {
				$chunk = '';
				$got = socket_recv($this->socket, $chunk, min($data - $bytes_recd, 2048), MSG_WAITALL); 
				if (!$got) {
					throw new Exception("Socket EOF2");
				}
				$chunks .= $chunk;
				$bytes_recd += strlen($chunk);
			}
			return(json_decode($chunks, true));
		} catch (Exception $e) {
			$this->socket = false;
			throw new Exception("Receive: ".$e->getMessage());
		}
	}
	
	public function command($command, $options=False) {
		/*
		Sends a command and return it's raw result.
		options has to be a list.
		Each item of options will be sent separately. So If you ant to send a list, pass a list of list.
		*/
		try {
			$ret = false;
			$this->_send($command);
			if ($options) {
				foreach ($options as $option) {
					$this->_send($option, false);
				}
			}
			$ret = $this->_receive();
		} catch (Exception $e) {
			// TODO : better handling of tries and delay between
			if ($this->self.verbose) {
				print('Error '.$e->getMessage().' sending command, trying to reconnect.');
			}
			$this->check_connection();
			$this->_send($command);
			if ($options) {
				foreach ($options as $option) {
					$this->_send($option, false);
				}
			}
			$ret = $this->_receive();
		}
		return($ret);
	}

	protected function close() {
		//Close the socket
		try {
			socket_close($this->socket);
		} catch(Exception $e) {}
   }

}
