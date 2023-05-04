namespace Obnovljivac.API.Services.NasaPower
{
    public interface INasaPowerService
    {
        Task<HttpResponseMessage> GetWind();
    }
}
