using System;

class Demo
    {
        static void Main(string[] args)
        {
            string ret = String.Empty;

            BismuthAPI connectionBismuthAPI = new BismuthAPI("127.0.0.1", 5658);

            // Ask for general status
            Console.WriteLine("statusjson:");
            ret = connectionBismuthAPI.Command("statusjson");
            Console.WriteLine(ret);
            Console.WriteLine();

            // Gets a specific block details
            Console.WriteLine("blockget(558742):");
            ret = connectionBismuthAPI.Command("blockget", 558742);
            Console.WriteLine(ret);
            Console.WriteLine();

            // Gets latest block and diff
            Console.WriteLine("difflast:");
            ret = connectionBismuthAPI.Command("difflast");
            Console.WriteLine(ret);
            Console.WriteLine();

            // Gets tx detail, raw format
            Console.WriteLine("api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', false):");
            ret = connectionBismuthAPI.Command("api_gettransaction", "K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj", false);
            Console.WriteLine(ret);
            Console.WriteLine();

            // Gets tx detail, json format
            Console.WriteLine("api_gettransaction('K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', true):");
            ret = connectionBismuthAPI.Command("api_gettransaction", "K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj", true);
            Console.WriteLine(ret);
            Console.WriteLine();

            // Gets addresses balances
            Console.WriteLine("api_listbalance(['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10','340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'], 0, true):");
            string[] addresses = new string[] { "731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10", "340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d" };
            ret = connectionBismuthAPI.Command("api_listbalance", addresses, 0, true);
            Console.WriteLine(ret);
            Console.WriteLine();

            // Ask for a new keys/address set
            Console.WriteLine("keygen:");
            ret = connectionBismuthAPI.Command("keygen");
            Console.WriteLine(ret);
            Console.WriteLine();
    }
}
