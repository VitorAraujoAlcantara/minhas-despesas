using FluentValidation;
using MinhasDespesas.Models.Dtos;

namespace MinhasDespesas.Models.Validators;

public class ContaCreateDtoValidator : AbstractValidator<ContaCreateDto>
{
    public ContaCreateDtoValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty()
            .NotNull()
            .MinimumLength(6)
            .Matches(@"[A-Z]").WithMessage("Sua senha precisa ter pelo menos uma letra maiuscula!")
            .Matches(@"[a-z]").WithMessage("Sua senha precisa ter pelo menos uma letra minuscula!")
            .Matches(@"[0-9]").WithMessage("Sua senha precisa ter pelo menos um número!")
            .Matches(@"[\!@#$%&]").WithMessage("Sua senha precisa ter pelo menos um desses caracteres(!@#$%&)!")
            ;

        RuleFor(x => x.PasswordConfirm)
            .Equal(x => x.Password).WithMessage("A confirmação de senha não bate!");

        RuleFor(x => x.Email)
            .EmailAddress()
            .NotEmpty()
            .NotNull();

        RuleFor(X => X.Nome)
            .NotEmpty()
            .NotNull()
            .MinimumLength(5);

    }
}