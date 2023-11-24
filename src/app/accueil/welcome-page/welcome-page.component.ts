import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { AccueilService } from 'src/app/services/accueil.service';
import { AdminService } from 'src/app/services/admin.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  serieStatistic : number[] = [1,1,1,1,1,1];

  constructor(private route : Router, private accueilService : AccueilService,private adminService : AdminService){
    this.chartOptions = {
      series: this.serieStatistic,
      chart: {
        type: "donut"
      },
      labels: ["Equiments", "Types", "Electriciens", "Admin", "Users", "Dime"],
      responsive: [
        {
          breakpoint: 100, //default value 480
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.accueilService.pageIndex.next(1);
    this.adminService.getStatistic().subscribe((result : any)=>{
      this.serieStatistic = result["data"];
      this.chartOptions.series = result["data"];
    })
  }

  goToType(){
    this.route.navigate(['accueil/typ-equipement']);
  }
  goToEquipement(){
    this.route.navigate(['accueil/equipement']);
  }
  goToElectricien(){
    this.route.navigate(['accueil/electricien']);
  }
  goToAdmin(){
    this.route.navigate(['accueil/administrateur']);
  }
  goToUsers(){
    this.route.navigate(['accueil/utilisateur']);
  }

}
