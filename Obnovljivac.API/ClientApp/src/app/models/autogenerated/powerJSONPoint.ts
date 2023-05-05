import {Geometry} from './geometry';
import {Header} from './header';
import {Parameters} from './parameters';
import {ParameterSeries} from './parameterSeries';
import {Times} from './times';

// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IPowerJSONPoint  {
    type: string;
    geometry: Geometry;
    header: Header;
    messages: string[];
    parameters: Parameters;
    properties: ParameterSeries;
    times: Times;
}

export class PowerJSONPoint  implements IPowerJSONPoint {
    public type: string;
    public geometry: Geometry;
    public header: Header;
    public messages: string[];
    public parameters: Parameters;
    public properties: ParameterSeries;
    public times: Times;

    constructor(type: string = null,  geometry: Geometry = null,  header: Header = null,  messages: string[] = null,  parameters: Parameters = null,  properties: ParameterSeries = null,  times: Times = null ) {
        
        this.type = type;
        this.geometry = geometry;
        this.header = header;
        this.messages = messages;
        this.parameters = parameters;
        this.properties = properties;
        this.times = times;
    }
}

 
