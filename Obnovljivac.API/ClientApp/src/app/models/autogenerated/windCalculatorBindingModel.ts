import {WindSpeedPowerPairBindingModel} from './windSpeedPowerPairBindingModel';
import { ControlsOf } from 'src/app/core/types/controls-of';
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IWindCalculatorBindingModel  {
    latitude: number;
    longitude: number;
    windClassWidth: number;
    windPowerPairs: WindSpeedPowerPairBindingModel[];
}

export interface IFormWindCalculatorBindingModel extends ControlsOf<WindCalculatorBindingModel>{}

export class WindCalculatorBindingModel  implements IWindCalculatorBindingModel {
    public latitude: number;
    public longitude: number;
    public windClassWidth: number;
    public windPowerPairs: WindSpeedPowerPairBindingModel[];

    constructor(latitude: number = null,  longitude: number = null,  windClassWidth: number = null,  windPowerPairs: WindSpeedPowerPairBindingModel[] = null ) {
        
        this.latitude = latitude;
        this.longitude = longitude;
        this.windClassWidth = windClassWidth;
        this.windPowerPairs = windPowerPairs;
    }
}

 
