using System.Net;

namespace CatFactAPI.Tests.Helper;

public class MockHttpClientFactory : IHttpClientFactory
{
    public HttpClient CreateClient(string name = "")
    {
        var handler = new HttpClientHandler
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
        };
        return new HttpClient(handler);
    }
}