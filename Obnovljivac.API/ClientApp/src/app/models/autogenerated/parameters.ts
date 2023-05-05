import {ParameterInformation} from './parameterInformation';

// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IParameters  {
    name: ParameterInformation;
}

export class Parameters  implements IParameters {
    public name: ParameterInformation;

    constructor(name: ParameterInformation = null ) {
        
        this.name = name;
    }
}

 
