using Obnovljivac.API.Models.NasaPower;

namespace Obnovljivac.API.Services.NasaPower
{
    public interface INasaPowerService
    {
        Task<PowerJSONPoint> GetWind();
    }
}
