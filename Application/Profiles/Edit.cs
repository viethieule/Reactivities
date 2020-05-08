using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidation : AbstractValidator<Command>
        {
            public CommandValidation()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername());

                bool isUpdate = false;
                if (user.DisplayName != request.DisplayName)
                {
                    user.DisplayName = request.DisplayName;
                    isUpdate = true;
                }
                if (user.Bio != request.Bio)
                {
                    user.Bio = request.Bio;
                    isUpdate = true;
                }

                if (!isUpdate)
                {
                    return Unit.Value;
                }

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}