export interface Bill {
    id?: string;
    date:any;
    tokens: KitchenToken[];
    billing: Billing;
    users: string[];
    mode: 'dineIn' | 'takeAway' | 'delivery' | 'online';
    status: 'active' | 'cancelled' | 'settled' | 'finalized' | 'pending' | 'deleted';
    editHistory: BillEditHistory[];
    customerInfo?: CustomerInfo;
    deviceInfo: Device;
    table:Table;
}
export interface KitchenToken {
    id:string;
    tokenNo: number;
    date:any;
    status: 'cancelled' | 'finalized' | 'active' | 'deleted';
    editHistory: TokenEditHistory[];
    items: TokenItem[];
}
export interface TokenItem {
    id: string;
    name: string;
    image?: string[];
    price: number;
    quantity: number;
    tax: Tax;
    instruction?:string;
    category: Category  ;
}
export interface Billing {
    subTotal: number;
    discount?: Discount;
    tax: number;
    total: number;
    nonComplimentary: boolean;
    paymentType: 'cash' | 'card' | 'wallet' | 'UPI' | 'other' | null;
    transactionId?: string;
    instructions?:string;
}
export interface Tax {
    cgst:number;
    sgst:number;
    totalTax:number;
}
export interface Discount {
    type: 'percent' | 'amount';
    value: number;
}
export interface TokenEditHistory {
    editTime: any;
    editBy: string;
    editType: 'quantity' | 'price' | 'delete' | 'add';
    previousValue: any;
    newValue: any;
}
export interface BillEditHistory {
    editTime: any;
    editBy: string;
    editType: 'discountChange' | 'complimentaryChange' | 'customerInfo' | 'cancelled' | 'settled' | 'finalized' | 'pending' | 'deleted';
    previousValue: any;
    newValue: any;
}
export interface CustomerInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
    id: string;
}
export interface Device {
    id:string;
    setupDate:any;
    name: string;
    resourcesInfo: any;
}
export interface Table {
    id: string;
    bill?: string;
    maxOccupancy: number;
    name: string;
    status: 'empty' | 'reserved' | 'occupied' | 'dirty' | 'finalized';
    tableNo: string;
    type: 'table' | 'room';
}
export interface Category {
    id: string;
    name: string;
    image?: string;
}