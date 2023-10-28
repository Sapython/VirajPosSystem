import { Category, Tax } from "./bill.structure";

export interface Product {
    id?:string;
    tags:string[];
    recipe:string[];
    dishName:string;
    prices:Prices;
    category:Category;
    thirdPartyPrice:number;
    additionalInstructions:string[];
    ingredients:Ingredient[];
    images:string[];
    taxes:Tax[];
    platforms:string[];
    availableOnQrMenu:boolean;
}
export interface Ingredient {
    id?:string;
    name:string;
    quantity:number;
    unit:string;
    ratePerUnit:number;
    totalCost:number;
    available:boolean;
    warningThresold:number;
    errorThresold:number;
    openingBalance:number;
    closingBalance:number;
    openingDate:any;
    closingDate:any;
    history:IngredientHistory[];
}

export interface IngredientHistory {
    updateType:'openingBalance' | 'closingBalance' | 'purchase' | 'quantity' | 'update';
    updateDate:any;
    updateBy:string;
    previousValue:any;
    newValue:any;
}

export interface Prices {
    costPrice:number;
    onlinePrice:number;
    sellingPrice:number;
    billerPrice:number;
}