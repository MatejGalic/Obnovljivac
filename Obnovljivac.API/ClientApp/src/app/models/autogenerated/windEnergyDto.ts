
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IWindEnergyDto  {
    dailyEnergy: number[][];
    monthlyEnergy: number[];
    yearlyEnergy: number;
}

export class WindEnergyDto  implements IWindEnergyDto {
    public dailyEnergy: number[][];
    public monthlyEnergy: number[];
    public yearlyEnergy: number;

    constructor(dailyEnergy: number[][] = null,  monthlyEnergy: number[] = null,  yearlyEnergy: number = null ) {

        this.dailyEnergy = dailyEnergy;
        this.monthlyEnergy = monthlyEnergy;
        this.yearlyEnergy = yearlyEnergy;
    }
}


