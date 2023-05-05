namespace Obnovljivac.API.Models.NasaPower
{
    /// <summary>
    /// Model from 
    /// <see href="https://power.larc.nasa.gov/api/pages/?urls.primaryName=Daily">
    /// POWER Daily API
    /// </see>
    /// <br></br>
    /// The API allows daily data requests of POWER Analysis Ready Data (ARD).
    /// </summary>
    public class PowerJSONPoint
    {
        public string Type { get; set; }
        public Geometry Geometry { get; set; }
        public Header Header { get; set; }
        public IEnumerable<string> Messages { get; set; }
        public Parameters Parameters { get; set; }
        public ParameterSeries Properties { get; set; }
        public Times Times { get; set; }
    }
}
