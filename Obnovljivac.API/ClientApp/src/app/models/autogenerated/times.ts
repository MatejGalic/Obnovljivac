
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface ITimes  {
    data: number;
    process: number;
}

export class Times  implements ITimes {
    public data: number;
    public process: number;

    constructor(data: number = null,  process: number = null ) {
        
        this.data = data;
        this.process = process;
    }
}

 
