import {Component, OnInit} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Bill, Category, Device, KitchenToken, Table, TokenItem } from './model/bill.structure';
import { Product } from './model/product.structure';
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
  categories:Category[] = [
    {
      id:"pqreqba34uiuiuk2v3re4",
      name:"Beverages"
    },
    {
      id:"opi4234mv4c3uyrajwb281",
      name:"Indian"
    },
    {
      id:"0lkaq8h3k4b3n2m234awkjo",
      name:"Chinese"
    },
  ]
  dishes:Product[] = [
    {
      id:"pqreqba34uiuiuk2v3re4",
      tags:["Beverages"],
      recipe:["Water"],
      dishName:"Water",
      prices:{
        costPrice:0,
        onlinePrice:0,
        sellingPrice:0,
        billerPrice:100,
      },
      category:this.categories[0],
      thirdPartyPrice:0,
      additionalInstructions:[],
      ingredients:[],
      images:[],
      taxes:[],
      platforms:[],
      availableOnQrMenu:false,
    },
    {
      id:"pqreqba34uiuiuk2v3re5",
      tags:["Beverages"],
      recipe:["Water"],
      dishName:"Chole Bhature",
      prices:{
        costPrice:0,
        onlinePrice:0,
        sellingPrice:0,
        billerPrice:100,
      },
      category:this.categories[1],
      thirdPartyPrice:0,
      additionalInstructions:[],
      ingredients:[],
      images:[],
      taxes:[],
      platforms:[],
      availableOnQrMenu:false,
    },
    {
      id:"pqreqba34uiuiuk2v3re4",
      tags:["Beverages"],
      recipe:["Water"],
      dishName:"Spring Roll",
      prices:{
        costPrice:0,
        onlinePrice:0,
        sellingPrice:0,
        billerPrice:100,
      },
      category:this.categories[2],
      thirdPartyPrice:0,
      additionalInstructions:[],
      ingredients:[],
      images:[],
      taxes:[],
      platforms:[],
      availableOnQrMenu:false,
    },
    {
      id:"pqreqba34uiuiuk2v3re4",
      tags:["Beverages"],
      recipe:["Water"],
      dishName:"Dosa",
      prices:{
        costPrice:0,
        onlinePrice:0,
        sellingPrice:0,
        billerPrice:100,
      },
      category:this.categories[1],
      thirdPartyPrice:0,
      additionalInstructions:[],
      ingredients:[],
      images:[],
      taxes:[],
      platforms:[],
      availableOnQrMenu:false,
    },
    
  ]
  tokenNo = 0;
  filteredDishes:Product[] = this.dishes;
  currentBill:Bill | undefined;
  currentDevice:Device = {
    id:"pq",
    name:"Viraj",
    resourcesInfo:{},
    setupDate:new Date(),
  }
  currentTable:Table = {
    id:"pq",
    maxOccupancy:4,
    name:"Viraj",
    status:"empty",
    tableNo:"1",
    type:"table",
  }
  ngOnInit(): void {
    
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

  selectCategory(category:Category){
    this.filteredDishes = this.dishes.filter(dish => dish.category.id == category.id);
  }

  addProduct(product:Product){
    if (this.currentBill && this.currentBill.tokens.length > 0) {
      let tokenItem:TokenItem = {
        id:this.generateId(),
        category:product.category,
        name:product.dishName,
        price:product.prices.billerPrice,
        quantity:1,
        image:product.images,
        tax:product.taxes.length > 0 ? product.taxes[0] : {cgst:9,sgst:9,totalTax:18},
      }
      let token:KitchenToken = {
        id:this.generateId(),
        date:new Date(),
        editHistory:[],
        items:[tokenItem],
        status:"active",
        tokenNo:JSON.parse(JSON.stringify(this.tokenNo)),
      }
      if (this.currentBill.tokens[this.currentBill.tokens.length-1].status == "active"){
        // check if the item is already present
        let itemIndex = this.currentBill.tokens[this.currentBill.tokens.length-1].items.findIndex(item => item.name == product.dishName);
        if (itemIndex > -1){
          this.currentBill.tokens[this.currentBill.tokens.length-1].items[itemIndex].quantity+=1;
          this.calculateBill(this.currentBill)
        } else {
          this.currentBill.tokens[this.currentBill.tokens.length-1].items.push(JSON.parse(JSON.stringify(tokenItem)));
          this.calculateBill(this.currentBill)
        } 
      } else if (this.currentBill.tokens[this.currentBill.tokens.length-1].status == "finalized"){
        this.tokenNo=this.tokenNo+1;
        console.log(token);
        this.currentBill.tokens.push(JSON.parse(JSON.stringify(token)));
        this.calculateBill(this.currentBill)
      }
    } else {
      this.tokenNo=this.tokenNo+1;
      let tokenItem:TokenItem = {
        id:this.generateId(),
        category:product.category,
        name:product.dishName,
        price:product.prices.billerPrice,
        quantity:1,
        image:product.images,
        tax:product.taxes.length > 0 ? product.taxes[0] : {cgst:9,sgst:9,totalTax:18},
      }
      let token:KitchenToken = {
        id:this.generateId(),
        date:new Date(),
        editHistory:[],
        items:[tokenItem],
        status:"active",
        tokenNo:JSON.parse(JSON.stringify(this.tokenNo)),
      }
      let currentBill:Bill = {
        id:this.generateId(),
        date:new Date(),
        tokens:[JSON.parse(JSON.stringify(token))],
        billing:{
          total:0,
          nonComplimentary:false,
          paymentType:null,
          subTotal:0,
          tax:0
        },
        deviceInfo:this.currentDevice,
        editHistory:[],
        mode:'dineIn',
        status:'active',
        table:this.currentTable,
        users:[],
      }
      this.calculateBill(currentBill);
      this.currentBill = currentBill;
    }
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  removeItem(token:TokenItem, items:TokenItem[]){
    let index = items.indexOf(token);
    items.splice(index, 1);
  }

  addInstruction(token:TokenItem){
    token.instruction=prompt("Enter Instruction") || '';
  }

  calculateBill(bill:Bill){
    let total = 0;
    bill.tokens.forEach(token => {
      token.items.forEach((item:any) => {
        total += item.price * item.quantity;
      });
    });
    bill.billing.subTotal = total;
    bill.billing.tax = total * 0.18;
    bill.billing.total = total + bill.billing.tax;
  }
}
