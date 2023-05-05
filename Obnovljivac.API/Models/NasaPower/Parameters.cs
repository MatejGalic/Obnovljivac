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
    public class Parameters
    {
        public ParameterInformation Name { get; set; }
    }
}
