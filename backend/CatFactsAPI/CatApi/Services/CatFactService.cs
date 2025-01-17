using System.Collections;
using System.Text.Json;
using AutoMapper;
using CatApi.Data.Dtos;
using CatApi.Data.Entities;
using CatApi.Services.Interfaces;

namespace CatApi.Services;

public class CatFactService(IHttpClientFactory httpClientFactory, IMapper mapper) : ICatFactService
{
    private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    };
    
    public async Task<(int statusCode, CatFactDto? catFactDto)> GetCatFactAsync(int? factLength)
    {
        var url = "https://catfact.ninja/fact";
        
        if (factLength.HasValue)
        {
            if (factLength < 20) return (StatusCodes.Status403Forbidden, null);
            url += $"?max_length={factLength.Value}";
        }
        
        var httpClient = httpClientFactory.CreateClient();
        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode) return ((int)response.StatusCode, null);

        var content = await response.Content.ReadAsStringAsync();
        var fact = JsonSerializer.Deserialize<CatFact>(content);

        var factDTO = mapper.Map<CatFactDto>(fact);
        var statusCode = factDTO?.Fact != null ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest;
        
        return (statusCode, factDTO);
    }

    public async Task<(int statusCode, IEnumerable<CatFactDto>? catFactDtoList)> GetCatFactListAsync(int? factLength, int? maxListSize)
    {
        var url = "https://catfact.ninja/facts";
        if (factLength.HasValue)
        {
            if (factLength < 20) return (StatusCodes.Status403Forbidden, null);
            url += $"?max_length={factLength.Value}";
        }

        var httpClient = httpClientFactory.CreateClient();
        var allFacts = new List<CatFact>();
        var nextPageUrl = url;

        if (maxListSize is null or < 1) maxListSize = 1;
        
        while (!string.IsNullOrEmpty(nextPageUrl))
        {
            var response = await httpClient.GetAsync(nextPageUrl);

            if (!response.IsSuccessStatusCode)
                return ((int)response.StatusCode, null);

            var content = await response.Content.ReadAsStringAsync();

            var catFactResponse = JsonSerializer.Deserialize<CatFactResponse>(content, JsonOptions);

            if (catFactResponse?.data == null)
                return (StatusCodes.Status500InternalServerError, null);

            allFacts.AddRange(catFactResponse.data);

            if (allFacts.Count >= maxListSize.Value)
            {
                allFacts = allFacts.Take(maxListSize.Value).ToList();
                break;
            }

            nextPageUrl = catFactResponse.next_page_url;
        }

        var factDtoList = mapper.Map<List<CatFactDto>>(allFacts);

        return (StatusCodes.Status200OK, factDtoList);
    }
}