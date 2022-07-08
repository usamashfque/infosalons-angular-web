import { Item } from './item.model';

export class Invoice {
    id: number = 0;
    invoiceNo: string = "";
    clientName: string = "";
    purchaseOrderNumber: string = "";
    invoiceDue: string = "";
    invoiceDate: Date = new Date();
    defaultNote: string = "";
    totalAmount: number = 0.0;
    dateAdded: Date = new Date();
    dateUpdated: Date = new Date();
    invoiceItems: Item[] = [];
}
