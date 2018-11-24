using System;
using System.Linq;
using System.Net.Sockets;
using System.Net.NetworkInformation;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Text;

public class BismuthAPI
{
    private string server;
    private int port;
    private TcpClient tcpClientAPI = null;
    private NetworkStream tcpStream;

    public BismuthAPI(string nodeServer, int nodePort)
    {
        this.server = nodeServer;
        this.port = nodePort;
        this.cnxCheck();
    }

    ~BismuthAPI()
    {
        tcpStream.Close();
        tcpClientAPI.Close();
    }

    public string Command(params object[] cmds)
    {   
        for (int i = 0; i < cmds.Length; i++) this.Send(cmds[i]);
        return this.Receive();
    }

    public string Receive()
    {
        Byte[] lengthSocketMessage = new Byte[10];
        String responseData = String.Empty;

        Int32 nBytes = tcpStream.Read(lengthSocketMessage, 0, lengthSocketMessage.Length);
        responseData = System.Text.Encoding.ASCII.GetString(lengthSocketMessage, 0, nBytes);
        Int32 socketLenReceiveMessage = Int32.Parse(responseData);
        int socketTotalReceiveBytes = 0;

        string strJson;
        using (MemoryStream ms = new MemoryStream())
        {
            Byte[] data = new Byte[socketLenReceiveMessage];

            int numBytesRead;
            while ((numBytesRead = tcpStream.Read(data, 0, data.Length)) > 0)
            {
                Console.WriteLine("numBytesRead: "+ numBytesRead);
                ms.Write(data, 0, numBytesRead);
                socketTotalReceiveBytes += numBytesRead;
                if (socketTotalReceiveBytes == socketLenReceiveMessage) break;
            }
            strJson = Encoding.ASCII.GetString(ms.ToArray(), 0, (int)ms.Length);
        }

        return strJson;
    }

    public void Send(object cmd)
    {
        Byte[] data;

        string socketMessage = JsonConvert.SerializeObject(cmd);
        socketMessage = string.Format("{0:D10}", socketMessage.Length) + socketMessage;
        data = System.Text.Encoding.ASCII.GetBytes(socketMessage);
        tcpStream.Write(data, 0, data.Length);
    }

    static public string JsonDump(string jsonData)
    {
        JToken jt = JToken.Parse(jsonData);
        return jt.ToString();
    }

    private void cnxCheck()
    {
        if (this.tcpClientAPI == null)
        {
            try
            {
                this.tcpClientAPI = new TcpClient(this.server, this.port);
                this.tcpStream = this.tcpClientAPI.GetStream();
            }
            catch (SocketException e)
            {
                Console.WriteLine("SocketException: {0}", e);
            }
        } 
    }

    private TcpState getTCPState()
    {
        var foo = IPGlobalProperties.GetIPGlobalProperties()
          .GetActiveTcpConnections()
          .SingleOrDefault(x => x.LocalEndPoint.Equals(this.tcpClientAPI.Client.LocalEndPoint)
                             && x.RemoteEndPoint.Equals(this.tcpClientAPI.Client.RemoteEndPoint)
          );

        return foo != null ? foo.State : TcpState.Unknown;
    }
}
