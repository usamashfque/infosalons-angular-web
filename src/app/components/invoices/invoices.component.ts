import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { CommonService } from 'src/app/services/common.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  @ViewChild('hidedeletemodel') hidedeletemodel: any;
  public isDeleting = false;
  public selectedInvoice: Invoice;



  isDataLoading = false;
  isLoading = false;

  displayedColumns: string[] = ['clientName', 'invoiceNo', 'totalAmount', 'purchaseOrderNumber', 'invoiceItems', 'invoiceDate', 'dateAdded', 'action'];
  dataSource: MatTableDataSource<Invoice>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public datepipe: DatePipe,
    public invoicesService: InvoicesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
  ) {

  }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.isDataLoading = true;
    this.invoicesService.gets().then((response: any) => {
      // console.log(response)
      if (!!response) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isDataLoading = false;
    }, (response) => {
      this.isDataLoading = false;
    }).catch((response) => {
      this.isDataLoading = false;
    });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    if (this.dataSource?.data) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  openDeleteModal(data: any) {
    this.selectedInvoice = Object.assign({}, data);

  }

  confirmDelete() {
    this.isDeleting = true;
    this.invoicesService.delete(this.selectedInvoice.id).then((response: any) => {
      // console.log(response)
      if (!!response) {
        this.isDeleting = false;
        const index = this.dataSource.data.findIndex(obj => obj.id == this.selectedInvoice.id);
        // console.log(index)
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
        }
        // console.log(this.dataSource.data)

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.hidedeletemodel.nativeElement.click();
        this._snackBar.open("Invoice Deleted Successfully", "Dismiss", this.commonService.snackConfig);
      } else {
        this._snackBar.open("Invoice deleting failed", "Dismiss", this.commonService.snackConfig);
      }
    }, (response) => {
      this._snackBar.open("Invoice deleting failed", "Dismiss", this.commonService.snackConfig);
      this.isDeleting = false;
    }).catch((response) => {
      this._snackBar.open("Invoice deleting failed", "Dismiss", this.commonService.snackConfig);
      this.isDeleting = false;
    });
  }

  signOut() {
    localStorage.removeItem("signinuserinfo");
    localStorage.removeItem("_access_token");
    this.router.navigateByUrl("signin");
  }
}
