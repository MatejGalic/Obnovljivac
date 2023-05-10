using Obnovljivac.API.Models.BindingModels;
using Obnovljivac.API.Models.DTOs;

namespace Obnovljivac.API.Services.Wind
{
    public interface IWindService
    {
        Task<WindDailyEnergyDto> CalculateEnergy(WindCalculatorBindingModel model);
    }
}
