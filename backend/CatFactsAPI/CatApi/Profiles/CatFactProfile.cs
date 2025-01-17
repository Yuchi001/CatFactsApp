using AutoMapper;
using CatApi.Data.Dtos;
using CatApi.Data.Entities;

namespace CatApi;

public class CatFactProfile : Profile
{
    public CatFactProfile()
    {
        CreateMap<CatFact, CatFactDto>()
            .ForMember(dest => dest.Length, opt => opt.MapFrom(src => src.length))
            .ForMember(dest => dest.Fact, opt => opt.MapFrom(src => src.fact))
            .ForMember(dest => dest.Catness, opt => opt.MapFrom(src => GetCatness(src)));
    }

    private static int GetCatness(CatFact catFact)
    {
        if (catFact?.fact == null) return -1;

        return catFact.fact.Split(' ').Count(word => word.Contains("cat", StringComparison.CurrentCultureIgnoreCase));
    }
}