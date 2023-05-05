
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IGeometry  {
    type: string;
    coordinates: number[];
}

export class Geometry  implements IGeometry {
    public type: string;
    public coordinates: number[];

    constructor(type: string = null,  coordinates: number[] = null ) {
        
        this.type = type;
        this.coordinates = coordinates;
    }
}

 
