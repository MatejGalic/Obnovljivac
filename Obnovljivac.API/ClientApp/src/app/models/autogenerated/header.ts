import {ApiInformation} from './apiInformation';

// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IHeader  {
    title: string;
    apiInformation: ApiInformation;
}

export class Header  implements IHeader {
    public title: string;
    public apiInformation: ApiInformation;

    constructor(title: string = null,  apiInformation: ApiInformation = null ) {
        
        this.title = title;
        this.apiInformation = apiInformation;
    }
}

 
