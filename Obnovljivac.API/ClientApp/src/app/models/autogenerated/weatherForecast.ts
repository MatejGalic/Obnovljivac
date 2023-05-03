
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IWeatherForecast  {
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string | null;
}

export class WeatherForecast  implements IWeatherForecast {
    public date: Date;
    public temperatureC: number;
    public temperatureF: number;
    public summary: string | null;

    constructor(date: Date = null,  temperatureC: number = null,  temperatureF: number = null,  summary: string | null = null ) {
        
        this.date = date;
        this.temperatureC = temperatureC;
        this.temperatureF = temperatureF;
        this.summary = summary;
    }
}

 
