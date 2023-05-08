namespace Obnovljivac.API.Models.BindingModels
{
    public class WindCalculatorBindingModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        /// <summary>
        /// Expressed in <b>[m/s]</b>
        /// </summary>
        public double WindClassWidth { get; set; }
        public IEnumerable<WindSpeedPowerPairBindingModel> WindPowerPairs { get; set; }
    }
}
