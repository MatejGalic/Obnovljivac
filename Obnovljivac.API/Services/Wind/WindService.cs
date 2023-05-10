using Obnovljivac.API.Models.BindingModels;
using Obnovljivac.API.Models.DTOs;
using Obnovljivac.API.Services.NasaPower;

namespace Obnovljivac.API.Services.Wind
{
    public class WindService : IWindService
    {
        private readonly INasaPowerService _powerService;
        private readonly ILogger<WindService> _logger;

        public WindService(ILogger<WindService> logger, INasaPowerService powerService)
        {
            _logger = logger;
            _powerService = powerService;
        }

        public async Task<WindDailyEnergyDto> CalculateEnergy(WindCalculatorBindingModel model)
        {
            if (model == null) { return null; }

            var data = await _powerService.GetWindSpeeds(model);

            var windSpeeds = data.Properties.Parameter.GetValueOrDefault("WS50M");

            var avgSpeeds = GetAverageSpeedPerDay(windSpeeds);

            //Dictionary<int, Dictionary<int, double>> energy = new Dictionary<int, Dictionary<int, double>>();
            //for (int i = 1; i <= 12; i++)
            //{
            //    energy.Add(i, new Dictionary<int, double>());
            //}

            List<List<double>> dailyEnergy = new List<List<double>>();
            for (int i = 1; i <= 12; i++)
            {
                dailyEnergy.Add(new List<double>());
            }

            // Calculate energy for each day
            foreach (var dateSpeedPair in avgSpeeds)
            {
                int month = Int32.Parse(dateSpeedPair.Key.Substring(0, 2));
                //int day = Int32.Parse(dateSpeedPair.Key.Substring(2, 2));

                double dailyAvgSpeed = dateSpeedPair.Value;
                double energyPerDay = 0;

                foreach (var item in model.WindPowerPairs)
                {
                    double power = item.Power;
                    double currSpeed = item.WindSpeed;
                    double classWidth = model.WindClassWidth;

                    double rayleighValue = classWidth
                        * (Math.PI / 2)
                        * (currSpeed / (Math.Pow(dailyAvgSpeed, 2)))
                        * Math.Exp((-1 * Math.PI / 4) * Math.Pow(currSpeed / dailyAvgSpeed, 2));

                    energyPerDay += rayleighValue * 24 * power;
                }
                //energy.GetValueOrDefault(month).Add(day, energyPerDay);
                dailyEnergy.ElementAt(month - 1).Add(energyPerDay);
            }

            List<double> monthlyEnergy = new List<double>();
            foreach (var item in dailyEnergy)
            {
                monthlyEnergy.Add(item.Sum());
            }

            WindDailyEnergyDto dto = new WindDailyEnergyDto();
            dto.DailyEnergy = dailyEnergy;
            dto.MonthlyEnergy = monthlyEnergy;
            dto.YearlyEnergy = monthlyEnergy.Sum();
            return dto;
        }

        private Dictionary<string, double> GetAverageSpeedPerDay(Dictionary<string, double> speeds)
        {
            // pairs of days/moths in a year and collection of wind speeds
            var collection = new Dictionary<string, List<double>>();
            foreach (var pair in speeds)
            {
                // skip leap year
                //if (pair.Key.Substring(4, 4) == "0229") { continue; }

                // Take month and day as key
                string newDateKey = pair.Key.Substring(4, 4);                

                if (collection.ContainsKey(newDateKey))
                {
                    collection.GetValueOrDefault(newDateKey).Add(pair.Value);
                }
                else
                {
                    collection.Add(newDateKey, new List<double> { pair.Value });
                }
            }

            var averageSpeeds = new Dictionary<string, double>();
            foreach (var item in collection)
            {
                var avgPerDay = item.Value.Average();
                averageSpeeds.Add(item.Key, avgPerDay);
            }

            return averageSpeeds;
        }

    }
}
