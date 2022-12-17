using System.Runtime.Serialization;

namespace MinhasDespesas.Models.Exceptions;

public class MinhasDespesasException: Exception
{
    public MinhasDespesasException()
    {
    }

    public MinhasDespesasException(string? message) : base(message)
    {
    }

    public MinhasDespesasException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    protected MinhasDespesasException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
}