using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;

namespace CatFactAPI.Tests;

public abstract class ControllerUnitTestBase<TDtoType>(ITestOutputHelper output)
    where TDtoType : class
{
    protected const int Success200 = 200;
    protected const int Forbidden403 = 403;
    
    protected readonly ITestOutputHelper Output = output;

    protected (int Status, TDtoType? Object) GetValueFromResult(IActionResult? result)
    {
        if (result is null)
            return (-1, null);
            
        try
        {
            var okObjectResult = result as OkObjectResult;
            var obj = okObjectResult.Value as TDtoType;
            return (Success200, obj);
        }
        catch (Exception e)
        {
            var statusCodeResult = result as StatusCodeResult;
                
            if (statusCodeResult is null)
                return (-1, null);
                
            return (statusCodeResult.StatusCode, null);
        }
    }

    protected (int Status, List<TDtoType>? List) GetListFromResult(IActionResult? result)
    {
        if (result is null)
            return (-1, null);
            
        try
        {
            var okObjectResult = result as OkObjectResult;
            var list = okObjectResult.Value as List<TDtoType>;
            return (Success200, list);
        }
        catch (Exception e)
        {
            var statusCodeResult = result as StatusCodeResult;
                
            if (statusCodeResult is null)
                return (-1, null);
                
            return (statusCodeResult.StatusCode, null);
        }
    }

}