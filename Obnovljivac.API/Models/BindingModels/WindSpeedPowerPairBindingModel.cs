namespace Obnovljivac.API.Models.BindingModels
{
    public class WindSpeedPowerPairBindingModel
    {
        /// <summary>
        /// Expressed in <b>[m/s]</b>
        /// </summary>
        public double WindSpeed { get; set; }
        /// <summary>
        /// Expressed in <b>[kW]</b>
        /// </summary>
        public double Power { get; set; }
    }
}
