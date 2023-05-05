import {Parameters} from './parameters';

// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IProperties  {
    parameter: Parameters;
}

export class Properties  implements IProperties {
    public parameter: Parameters;

    constructor(parameter: Parameters = null ) {
        
        this.parameter = parameter;
    }
}

/*
Template debug info: 
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=header   Header  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=parameterInformation   ParameterInformation  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=header   Header  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=parameters   Parameters  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=header   Header  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=parameters   Parameters  False
LowerCaseTypeName:False name=times   Times  False
LowerCaseTypeName:False name=parameterInformation   ParameterInformation  False
LowerCaseTypeName:False name=parameterInformation   ParameterInformation  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=header   Header  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=parameters   Parameters  False
LowerCaseTypeName:False name=times   Times  False
LowerCaseTypeName:False name=parameters   Parameters  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=header   Header  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=properties   Properties  False
LowerCaseTypeName:False name=times   Times  False
LowerCaseTypeName:False name=geometry   Geometry  False
LowerCaseTypeName:False name=header   Header  False
LowerCaseTypeName:False name=any[]   any[]  False
LowerCaseTypeName:False name=parameters   Parameters  False
LowerCaseTypeName:False name=properties   Properties  False
LowerCaseTypeName:False name=times   Times  False
LowerCaseTypeName:False name=parameters   Parameters  False
*/ 
