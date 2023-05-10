using Obnovljivac.API.Models.BindingModels;
using Obnovljivac.API.Models.NasaPower;
using Obnovljivac.API.Services.Wind;
using System.Collections.Specialized;

namespace Obnovljivac.API.Services.NasaPower
{
    public class NasaPowerService : INasaPowerService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<NasaPowerService> _logger;
        /// <summary>
        /// API: <see href="https://power.larc.nasa.gov/api/pages/?urls.primaryName=Daily"/>
        /// </summary>
        private readonly string _url = $"https://power.larc.nasa.gov/api/temporal/daily/point";

        public NasaPowerService(ILogger<NasaPowerService> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<PowerJSONPoint> GetWindSpeeds(WindCalculatorBindingModel model)
        {
            string url = this.BuildUrl(model.Latitude, model.Longitude);
            var httpClient = _httpClientFactory.CreateClient("NasaPowerApi");

            _logger.LogInformation($"Requesting data from NASA POWER API: {url}");
            var httpResponseMessage = await httpClient.GetAsync(url);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var jsonModel = await httpResponseMessage.Content.ReadFromJsonAsync<PowerJSONPoint>();                
                return jsonModel;
            }

            return null;
        }

        private string BuildUrl(double latitude, double longitude)
        {
            NameValueCollection queryBuilder = System.Web.HttpUtility.ParseQueryString(string.Empty);

            // Constant values
            queryBuilder.Add("parameters", "WS50M");
            queryBuilder.Add("community", "RE");
            queryBuilder.Add("format", "JSON");

            // YYYYMMDD
            DateTime startDate = DateTime.UtcNow.AddYears(-5);
            DateTime endDate = DateTime.UtcNow;
            string start = startDate.Year.ToString() + startDate.Month.ToString("d2") + startDate.Day.ToString("d2");
            string end = endDate.Year.ToString() + endDate.Month.ToString("d2") + endDate.Day.ToString("d2");
            queryBuilder.Add("start", start);
            queryBuilder.Add("end", end);

            queryBuilder.Add("latitude", latitude.ToString(System.Globalization.CultureInfo.InvariantCulture));
            queryBuilder.Add("longitude", longitude.ToString(System.Globalization.CultureInfo.InvariantCulture));

            string queryString = queryBuilder.ToString();

            return $"{_url}?{queryString}";
        }
    }
}
