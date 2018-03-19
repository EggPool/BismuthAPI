<?php

/**
 * PHP Demo client for Bismuth Native API Library
 * (c) 2018 EggPool.Net
 *
 * @package BismuthAPI
 * @author @EggPool
 */


// Bismuth Connection layer
require_once "BismuthNative.inc.php";

// Bismuth Node IP
$SERVER = '127.0.0.1';

// Default port
$PORT = 5658;

$VERBOSE = false;

$connection = new BismuthNative($SERVER, $PORT, $VERBOSE);

// Ask for general status
$ret = $connection->command('statusjson');
print('statusjson:');
print_r($ret);
print('---------------------------------------');
// Gets a specific block details
// With this sample client library, params are encoded as a list even if there is only one param
$ret = $connection->command('blockget', [558742]);
print('blockget(558742):');
print_r($ret);
print('---------------------------------------');
// Gets latest block and diff
$ret = $connection->command('difflast');
print('difflast:');
print_r($ret);
print('---------------------------------------');
// Gets tx detail, raw format
$ret = $connection->command('api_gettransaction', ['K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', False]);
print("api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', False):");
print_r($ret);
print('---------------------------------------');
// Gets tx detail, json format
$ret = $connection->command('api_gettransaction', ['K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', True]);
print("api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', True):");
print_r($ret);
print('---------------------------------------');
// Gets addresses balances
// Since the param is a list, we send a list of list.
$ret = $connection->command('api_listbalance', [ ['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10','340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'], 0, True]);
print("api_listbalance(['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10','340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'], 0, True):");
print_r($ret);
print('---------------------------------------');
// Ask for a new keys/address set
$ret = $connection->command('keygen');
print('keygen:');
print_r($ret);
print('---------------------------------------');

