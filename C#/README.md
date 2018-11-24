# C# code for Bismuth Native API access

Demonstrates the use of a simple C# client library.

+ [BismuthAPI.cs](BismuthAPI.cs) : C# Client library
+ [Demo.cs](Demo.cs) : A simple demo app, showing a few simple commands. It's needs a running node.
+ [Demo_getaddress_since.cs](Demo_getaddress_since.cs) : A simple demo app, showing the `api_getaddresssince` api command. It's needs a running node. 

## Notes

Use [newtonsoft-json](https://www.nuget.org/packages/Newtonsoft.Json/) package to parse JSON API response. To download from NuGet, You can do this a couple of ways.

**Via the "Solution Explorer"**

    Simply right-click the "References" folder and select "Manage NuGet Packages..."
    Once that window comes up click on the option labeled "Online" in the left most part of the dialog.
    Then in the search bar in the upper right type "json.net"
    Click "Install" and you're done.

**Via the "Package Manager Console"**

    Open the console. "View" > "Other Windows" > "Package Manager Console"
    Then type the following:

    Install-Package Newtonsoft.Json

For more info on how to use the "Package Manager Console" check out the [nuget docs](https://docs.microsoft.com/fr-fr/nuget/tools/package-manager-console).

### Patches

Anybody can contribute to development. If you are contributing a source code change, use a merge request of a Git branch.