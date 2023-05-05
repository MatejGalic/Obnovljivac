
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IApiInformation  {
    version: string;
    name: string;
}

export class ApiInformation  implements IApiInformation {
    public version: string;
    public name: string;

    constructor(version: string = null,  name: string = null ) {
        
        this.version = version;
        this.name = name;
    }
}

 
