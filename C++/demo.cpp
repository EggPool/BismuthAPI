

// https://github.com/EggPool/BismuthAPI
// Bismuth Native API command reference: https://github.com/EggPool/BismuthAPI/blob/3ebf5449d2763fd01e3fb44c2234fc5f1b99affa/Doc/commands_reference.md

#include "BismuthNative.hpp"


int main() 
{

const std::string nodeServer = "127.0.0.1";
int nodePort = 5658;
bool verbose = true;

BismuthNative *connectionBismuthAPI = new BismuthNative(nodeServer, nodePort, verbose);

// Ask for general status
std::cout << "statusjson: " << std::endl
          << connectionBismuthAPI->command("statusjson") << std::endl;
std::cout << "---------------------------------------" << std::endl;

// Gets a specific block details
std::cout << "blockget(558742): " << std::endl
          << connectionBismuthAPI->command("blockget", 558742) << std::endl;
std::cout << "---------------------------------------" << std::endl;

// Gets latest block and diff
std::cout << "difflast: " << std::endl
          << connectionBismuthAPI->command("difflast") << std::endl;
std::cout << "---------------------------------------" << std::endl;

// Gets tx detail, raw format
std::cout << "api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', false): " << std::endl
          << connectionBismuthAPI->command("api_gettransaction", "K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj", 0) << std::endl;
std::cout << "---------------------------------------" << std::endl;
// Gets tx detail, json format
std::cout << "api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', true): " << std::endl
          << connectionBismuthAPI->command("api_gettransaction", "K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj", 1) << std::endl;
std::cout << "---------------------------------------" << std::endl;

// Gets addresses balances
std::cout << "api_listbalance(['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10','340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'], 0, True):" << std::endl
          << connectionBismuthAPI->command("api_listbalance", std::vector<std::string>({"731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10", "340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d"}), 0, 1) << std::endl;
std::cout << "---------------------------------------" << std::endl;

// Ask for a new keys/address set
std::cout << "keygen: " << std::endl
          << connectionBismuthAPI->command("keygen") << std::endl;
std::cout << "---------------------------------------" << std::endl;

delete (connectionBismuthAPI);

return EXIT_SUCCESS;
}
