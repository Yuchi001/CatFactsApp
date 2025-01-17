using CatApi.Data.Dtos;

namespace CatApi.Services.Interfaces;

public interface ICatFactService
{
    Task<(int statusCode, CatFactDto? catFactDto)> GetCatFactAsync(int? factLength);
    Task<(int statusCode, IEnumerable<CatFactDto>? catFactDtoList)> GetCatFactListAsync(int? factLength, int? maxListSize);
}