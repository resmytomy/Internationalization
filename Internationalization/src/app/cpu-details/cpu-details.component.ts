import { Component, OnInit } from '@angular/core';
import { cpuContent } from './cpuContents';
import {cpuDataService} from './cpuDataService';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cpu-details',
  templateUrl: './cpu-details.component.html',
  styleUrls: ['./cpu-details.component.scss']
})
export class CpuDetailsComponent implements OnInit {
  title = 'MultilanguageApp'; 
  constructor(private cpuDataService: cpuDataService,public translate: TranslateService) {
    translate.addLangs(['en', 'fr','ml']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
    } 
   }
  batteryInfo;
  cpuInfo;
  batteryDetails:cpuContent[]=[]; 
 cpuContentList :cpuContent[]=[]; 
 
  loading: boolean = false;
  errorMessage
  ngOnInit(): void {
    console.log("Start")
    this.getcpuDetails();
    console.log('this.getfile') 
   }
  public getcpuDetails() {
    console.log('inside this')
    this.errorMessage = "";
    this.cpuDataService.getCpuDetails()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received'+response)
        
          console.log(response);
          this.cpuInfo=response.cpu;
          this.batteryInfo=response.battery;
          this.formatContent();
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        )
  }

  public formatContent(){

    for (let key in this.cpuInfo) {
      const  content:cpuContent={name :key,
        value:this.cpuInfo[key]}
        this.cpuContentList.push(content);
  }
  
  for (let key in this.batteryInfo) {
    const  content:cpuContent={name :key,
      value:this.batteryInfo[key]}
      this.batteryDetails.push(content);
}
  
}
changeLang(language: string) {  
  localStorage.setItem('locale', language);  
  console.log(language);
  this.translate.use(language);  
} 

}
