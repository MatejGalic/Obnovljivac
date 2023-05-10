
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface IWindDailyEnergyDto  {
    dailyEnergy: number[][];
    monthlyEnergy: number[];
    yearlyEnergy: number;
}

export class WindDailyEnergyDto  implements IWindDailyEnergyDto {
    public dailyEnergy: number[][];
    public monthlyEnergy: number[];
    public yearlyEnergy: number;

    constructor(dailyEnergy: number[][] = null,  monthlyEnergy: number[] = null,  yearlyEnergy: number = null ) {

        this.dailyEnergy = dailyEnergy;
        this.monthlyEnergy = monthlyEnergy;
        this.yearlyEnergy = yearlyEnergy;
    }
}


