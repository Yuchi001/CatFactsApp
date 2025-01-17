using AutoMapper;
using CatApi.Controllers;
using CatApi.Data.Dtos;
using CatApi.Data.Entities;
using CatApi.Services;
using CatFactAPI.Tests.Helper;
using Xunit.Abstractions;

namespace CatFactAPI.Tests;

[Collection("Sequential")]
public sealed class CatFactControllerUnitTests : ControllerUnitTestBase<CatFactDto>
{
    private readonly CatFactController _controller;

    private const int MINIMAL_FACT_LENGTH = 20;
    private const int INVALID_FACT_LENGTH = -1;

    private const int INVALID_LIST_SIZE = -1;
    private const int EXAMPLE_LIST_SIZE = 10;

    public CatFactControllerUnitTests(ITestOutputHelper output) : base(output)
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<CatFact, CatFactDto>();
        });
        var mapper = config.CreateMapper();

        var httpClientFactory = new MockHttpClientFactory();

        var service = new CatFactService(httpClientFactory, mapper);
        _controller = new CatFactController(service);
    }
    
    [Theory]
    [InlineData(MINIMAL_FACT_LENGTH)] // minimal value => expected status code 200
    [InlineData(null)] // null value => expected status code 200
    [InlineData(INVALID_FACT_LENGTH)] // negative numbers => expected status code 403
    public async void GetCatFactTest(int? factLength)
    {
        var result = await _controller.GetCatFact(factLength);
        var objResult = GetValueFromResult(result);
        switch (factLength)
        {
            case null:
                Assert.NotNull(objResult.Object);
                Assert.Equal(Success200, objResult.Status);
                break;
            case MINIMAL_FACT_LENGTH:
                Assert.NotNull(objResult.Object);
                Assert.Equal(Success200, objResult.Status);
                break;
            case INVALID_FACT_LENGTH:
                Assert.Null(objResult.Object);
                Assert.Equal(Forbidden403, objResult.Status);
                break;
        }
        
        Output.WriteLine($"Status code: {objResult.Status}, is object valid: {objResult.Object?.Fact != null}");
    }
    
    [Theory]
    [InlineData(MINIMAL_FACT_LENGTH, null)] // minimal value, list size not specified => expected status code 200
    [InlineData(null, null)] // null value, list size not specified => expected status code 200
    [InlineData(INVALID_FACT_LENGTH, null)] // negative numbers, list size not specified => expected status code 403
    [InlineData(null, INVALID_LIST_SIZE)] // minimal value, list size not valid => expected status code 200, list size > 1
    [InlineData(null, EXAMPLE_LIST_SIZE)] // minimal value, list size valid => expected status code 200, list size == 10
    public async void GetCatFactListTest(int? factLength, int? maxListSize)
    {
        var result = await _controller.GetCatFactList(factLength, maxListSize);
        var objResult = GetListFromResult(result);
        switch (factLength)
        {
            case null:
                Assert.Equal(Success200, objResult.Status);
                Assert.NotEmpty(objResult.List ?? []);
                break;
            case MINIMAL_FACT_LENGTH:
                Assert.Equal(Success200, objResult.Status);
                Assert.NotEmpty(objResult.List ?? []);
                if (maxListSize == EXAMPLE_LIST_SIZE) Assert.Equal(EXAMPLE_LIST_SIZE, objResult.List?.Count);
                break;
            case INVALID_FACT_LENGTH:
                Assert.Equal(Forbidden403, objResult.Status);
                Assert.Null(objResult.List);
                break;
        }
        
        Output.WriteLine($"Status code: {objResult.Status}, list count: {objResult.List?.Count ?? -1}");
    }
}