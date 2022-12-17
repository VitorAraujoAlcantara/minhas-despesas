namespace MinhasDespesas.Models.Dtos;

public class PaginatedDataQueryDto
{
    public int ItensPerPage { get; set; }
    public int Page { get; set; }
    public string? Order { get; set; }

    public PaginatedDataQueryDto()
    {
        ItensPerPage = 10;
        Page = 1;
        Order = null;
    }
}