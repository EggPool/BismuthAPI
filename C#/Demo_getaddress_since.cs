using System;

class Demo_getaddress_since
{
    static string Get_address_since(int since, int min_conf, string address)
    {
        BismuthAPI connectionBismuthAPI = new BismuthAPI("127.0.0.1", 5658);

        // Command first
        connectionBismuthAPI.Send("api_getaddresssince");
        // Then last block 
        connectionBismuthAPI.Send(since);
        // min confirmations
        connectionBismuthAPI.Send(min_conf);
        // and finally the address
        connectionBismuthAPI.Send(address);

        return  connectionBismuthAPI.Receive();
    }

    static void Usage(string message)
    {
        Console.WriteLine(message);
        Console.WriteLine("Usage: BismuthAPI <block_height> <min_conf> <address>");
        Environment.Exit(1);
    }
    
    static void Main(string[] args)
    {
        string res_as_native_dict = String.Empty;
        int since, min_conf;
        string address;

        if (args.Length != 3) Usage("Please enter arguments.");
        if (int.TryParse(args[0], out since) == false) Usage("Please enter a numeric argument for last known block: <block_height>");
        if (int.TryParse(args[1], out min_conf) == false) Usage("Please enter a numeric argument for min confirmations: <min_conf >");
        address = args[2];

        Console.WriteLine("api_getaddresssince since " + since + " minconf=" + min_conf + " for address " + address);
        res_as_native_dict = Get_address_since(since, min_conf, address);
        Console.WriteLine(BismuthAPI.JsonDump(res_as_native_dict));
        Console.WriteLine();

        Environment.Exit(0);
    }
}