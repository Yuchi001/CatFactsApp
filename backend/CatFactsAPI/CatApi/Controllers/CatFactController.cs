using CatApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CatApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatFactController(ICatFactService catFactService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCatFact([FromQuery] int? factLength)
    {
        var tuple = await catFactService.GetCatFactAsync(factLength);
        if (tuple.catFactDto == null) return StatusCode(tuple.statusCode);
        
        return Ok(tuple.catFactDto);
    }
    
    [HttpGet("list")]
    public async Task<IActionResult> GetCatFactList([FromQuery] int? factLength, int? maxSizeList)
    {
        var tuple = await catFactService.GetCatFactListAsync(factLength, maxSizeList);
        if (tuple.catFactDtoList == null) return StatusCode(tuple.statusCode);
        
        return Ok(tuple.catFactDtoList);
    }
}