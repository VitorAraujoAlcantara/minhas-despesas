using System.Runtime.Serialization;

namespace MinhasDespesas.Models.Exceptions;

public class CrudInterceptorValidateException: MinhasDespesasException
{
    public CrudInterceptorValidateException()
    {
    }

    public CrudInterceptorValidateException(string? message) : base(message)
    {
    }

    public CrudInterceptorValidateException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    protected CrudInterceptorValidateException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
}