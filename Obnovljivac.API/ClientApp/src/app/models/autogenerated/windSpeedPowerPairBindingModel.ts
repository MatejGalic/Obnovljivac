import { ControlsOf } from 'src/app/core/types/controls-of';
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IWindSpeedPowerPairBindingModel  {
    windSpeed: number;
    power: number;
}

export interface IFormWindSpeedPowerPairBindingModel extends ControlsOf<WindSpeedPowerPairBindingModel>{}

export class WindSpeedPowerPairBindingModel  implements IWindSpeedPowerPairBindingModel {
    public windSpeed: number;
    public power: number;

    constructor(windSpeed: number = null,  power: number = null ) {
        
        this.windSpeed = windSpeed;
        this.power = power;
    }
}

 
