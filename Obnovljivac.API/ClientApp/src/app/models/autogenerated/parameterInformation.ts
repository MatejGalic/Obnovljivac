
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IParameterInformation  {
    units: string;
    longName: string;
}

export class ParameterInformation  implements IParameterInformation {
    public units: string;
    public longName: string;

    constructor(units: string = null,  longName: string = null ) {
        
        this.units = units;
        this.longName = longName;
    }
}

 
