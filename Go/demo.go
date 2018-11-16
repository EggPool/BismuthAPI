package main

import (
	"BismuthAPI/bismuth"
)

func main() {
	const nodeServer string = "127.0.0.1"
	const nodePort int = 5658
	var ret string

	connectionBismuthAPI := BismuthNative.New("127.0.0.1", 5658)
	defer connectionBismuthAPI.Close()

	// Ask for general status
	println("statusjson:")
	ret = connectionBismuthAPI.Command("statusjson")
	println(ret)
	println("")

	// Gets a specific block details
	println("blockget(558742):")
	ret = connectionBismuthAPI.Command("blockget", 558742)
	println(ret)
	println("")

	// Gets latest block and diff
	println("difflast:")
	ret = connectionBismuthAPI.Command("difflast")
	println(ret)
	println("")

	// Gets tx detail, raw format
	println("api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', false):")
	ret = connectionBismuthAPI.Command("api_gettransaction", "K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj", false)
	println(ret)
	println("")

	// Gets tx detail, json format
	println("api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', true):")
	ret = connectionBismuthAPI.Command("api_gettransaction", "K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj", true)
	println(ret)
	println("")

	// Gets addresses balances
	println("api_listbalance(['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10','340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'], 0, true):")
	addresses := []string{"731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10", "340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d"}
	ret = connectionBismuthAPI.Command("api_listbalance", addresses, 0, true)
	println(ret)
	println("")

	// Ask for a new keys/address set
	println("keygen:")
	ret = connectionBismuthAPI.Command("keygen")
	println(ret)
	println("")
}
