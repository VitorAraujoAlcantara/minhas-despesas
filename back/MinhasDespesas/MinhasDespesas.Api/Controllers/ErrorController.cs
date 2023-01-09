using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MinhasDespesas.Models.Exceptions;

namespace MinhasDespesas.Api.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult HandleError()
    {
        var exceptionHandlerFeature =
            HttpContext.Features.Get<IExceptionHandlerFeature>()!;

        if (exceptionHandlerFeature.Error is FluentValidation.ValidationException && exceptionHandlerFeature.Error as FluentValidation.ValidationException != null)
        {
            return BadRequest((exceptionHandlerFeature.Error as FluentValidation.ValidationException).Errors.
            GroupBy(failure => failure.PropertyName)
                .Select(failures => new { propertyName = failures.Key, errorMessages = failures.Select(failure => failure.ErrorMessage) })
            );
        }
        return exceptionHandlerFeature.Error is CrudInterceptorValidateException ? BadRequest(exceptionHandlerFeature.Error.Message) : Problem();
    }
}