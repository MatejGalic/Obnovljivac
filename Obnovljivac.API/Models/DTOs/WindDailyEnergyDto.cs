namespace Obnovljivac.API.Models.DTOs
{
    public class WindDailyEnergyDto
    {
        //public Dictionary<int, Dictionary<int, double>> DailyEnergy { get; set; }
        public List<List<double>> DailyEnergy { get; set; }
        public List<double> MonthlyEnergy { get; set; }
        public double YearlyEnergy { get; set; }
    }
}
