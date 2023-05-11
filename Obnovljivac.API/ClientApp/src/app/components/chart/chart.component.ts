import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('canvasRef') canvas: ElementRef<HTMLCanvasElement>;

  @Input() options: any;
  @Input() labels: string[];

  private _data: number[];
  @Input() set data(value: number[]) {
    this._data = value;
    this.createChart();
  }

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  private createChart() {
    this.chart?.destroy();
    this.chart = new Chart('chart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: 'Sales',
            data: this._data,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
