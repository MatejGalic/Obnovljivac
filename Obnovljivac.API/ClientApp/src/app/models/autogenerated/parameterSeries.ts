
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IParameterSeries  {
    parameter: { [key: string]: { [key: string]: number; }; };
}

export class ParameterSeries  implements IParameterSeries {
    public parameter: { [key: string]: { [key: string]: number; }; };

    constructor(parameter: { [key: string]: { [key: string]: number; }; } = null ) {
        
        this.parameter = parameter;
    }
}

 
