using Obnovljivac.API.Models.NasaPower;

namespace Obnovljivac.API.Services.NasaPower
{
    public class NasaPowerService : INasaPowerService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _url = "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=WS50M&community=RE&longitude=-106.9109&latitude=38.1628&start=20210101&end=20210331&format=JSON";

        public NasaPowerService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<PowerJSONPoint> GetWind()
        {
            var httpClient = _httpClientFactory.CreateClient("NasaPowerApi");
            var httpResponseMessage = await httpClient.GetAsync(_url);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var jsonModel = await httpResponseMessage.Content.ReadFromJsonAsync<PowerJSONPoint>();
                return jsonModel;
            }

            return null;
        }
    }
}
