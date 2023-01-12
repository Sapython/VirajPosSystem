import {Component, OnInit} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import {DatabaseService} from './services/database.service';

const HSLToRGB = (h: any, s: any, l: any) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VirajPosSystem';

  constructor(public onlineDbService: DatabaseService, private dbService: NgxIndexedDBService) {
  }

  counter = 0;
  added = 0;
  list: any[] = [];
  people: any[] = [];
  coloredDivs: any[] = [];
  offlineData: Observable<any[]> | undefined;
  ngOnInit(): void {
    this.onlineDbService.getTasks().subscribe((doc) => {
      this.list = [];
      doc.forEach((doc) => {
        console.log(doc);
        this.list.push(doc);
      });
    });
    this.getDataFromDb()
    for (let index = 0; index < 20; index++) {
      this.coloredDivs.push(this.getColor());
    }
    console.log(this.coloredDivs);

  }

  getColor() {
    let mainOne = 360 * Math.random()
    let mainTwo = (25 + 70 * Math.random())
    let mainThree = (85 + 10 * Math.random())
    return [`hsl(${mainOne}, ${mainTwo}%, ${mainThree}%)`, HSLToRGB(mainOne, mainTwo, mainThree)];
  }


  getDataFromDb() {
    this.offlineData = this.dbService.getAll<any>('people')
    // this.offlineData.subscribe((data) => {
    //   console.log(data);
      
    // });
    
  }

  addToDb() {
    return this.dbService.add('people', {
      name: `Bruce Wayne`,
      email: `bruce@wayne.com`,
    }).subscribe(() => {
      this.getDataFromDb()
    })
  }
}
