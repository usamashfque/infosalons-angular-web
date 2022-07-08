import { CurrencyPipe, DatePipe, formatCurrency, getCurrencySymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { CommonService } from 'src/app/services/common.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  isFormEdit = false;
  isFormSow = false;
  editInvoiceObj: Invoice;

  submitted = false;
  isLoading = false;

  invoiceForm: FormGroup;
  totalSum: number = 0;
  myFormValueChanges$;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    public router: Router,
    public route: ActivatedRoute,
    public datepipe: DatePipe,
    public invoicesService: InvoicesService,
    public _snackBar: MatSnackBar,
    private commonService: CommonService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    let page;
    let a = this.route
      .queryParamMap
      .subscribe(params => {
        if (!!params.get('id')) {
          this.isFormEdit = true;
          this.getInvoice(parseInt(params.get('id')))
          this.invoiceForm = this.formBuilder.group({
            id: [0],
            invoiceNo: ["", [Validators.required, Validators.maxLength(25)]],
            clientName: ["", [Validators.required, Validators.maxLength(25)]],
            purchaseOrderNumber: ["", [Validators.required, Validators.maxLength(30)]],
            invoiceDate: ["", [Validators.required]],
            invoiceDue: ['receipt', [Validators.required]],
            defaultNote: ["", [Validators.required, Validators.maxLength(100)]],
            totalAmount: [0.0],
            invoiceItems: this.formBuilder.array([])
          });
        } else {
          this.isFormEdit = false;
          this.invoiceForm = this.formBuilder.group({
            id: [0],
            invoiceNo: ["", [Validators.required, Validators.maxLength(25)]],
            clientName: ["", [Validators.required, Validators.maxLength(25)]],
            purchaseOrderNumber: ["", [Validators.required, Validators.maxLength(30)]],
            invoiceDate: ["", [Validators.required]],
            invoiceDue: ['receipt', [Validators.required]],
            defaultNote: ["", [Validators.required, Validators.maxLength(100)]],
            totalAmount: [0.0],
            invoiceItems: this.formBuilder.array([
              this.getItem()
            ])
          });
          this.isFormSow = true;
        }
      });

    this.myFormValueChanges$ = this.invoiceForm.controls["invoiceItems"].valueChanges;

    this.myFormValueChanges$.subscribe(invoiceItems =>
      this.updateTotalItemPrice(invoiceItems)
    );
  }

  getInvoice(id: number) {
    this.invoicesService.get(id).then((response: any) => {
      // console.log(response)
      if (!!response) {
        this.editInvoiceObj = response;

        this.invoiceForm.patchValue({
          id: this.editInvoiceObj.id,
          invoiceNo: this.editInvoiceObj.invoiceNo,
          clientName: this.editInvoiceObj.clientName,
          purchaseOrderNumber: this.editInvoiceObj.purchaseOrderNumber,
          invoiceDate: this.datepipe.transform(new Date(this.editInvoiceObj.invoiceDate), 'YYYY-MM-dd'),
          invoiceDue: this.editInvoiceObj.invoiceDue,
          defaultNote: this.editInvoiceObj.defaultNote,
          totalAmount: this.editInvoiceObj.totalAmount
        });

        this.editInvoiceObj.invoiceItems.forEach(element => {

          var _data = this.formBuilder.group({
            id: element.id,
            description: element.description,
            quantity: element.quantity,
            rate: element.rate,
            itemTotalPrice: [{ value: element.quantity * element.rate, disabled: true }]
          });

          const control = <FormArray>this.invoiceForm.controls["invoiceItems"];
          control.push(_data);
        });
      }
      this.isFormSow = true;
    }, (response) => {
      this.isFormSow = true;
    }).catch((response) => {
      this.isFormSow = true;
    });
  }

  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  save(model: any, isValid: boolean, e: any) {
    this.submitted = true;
    if (this.invoiceForm.invalid) {

      const invalidControl = this.el.nativeElement.querySelector('.form-control.ng-invalid');
      // console.log(invalidControl)
      if (invalidControl) {
        invalidControl.focus();
      }

      return;
    }
    this.isLoading = true;
    model.invoiceDate = new Date(model.invoiceDate);

    // console.log(model)

    if (this.isFormEdit) {
      this.invoicesService.put(this.editInvoiceObj.id, model).then((response: any) => {
        // console.log(response)
        if (!!response) {
          this.router.navigateByUrl('admin/invoices');
          this._snackBar.open("Invoice updated successfully", "Dismiss", this.commonService.snackConfig);
        } else {
          this._snackBar.open("Invoice updating failed!", "Dismiss", this.commonService.snackConfig);
        }
        this.isLoading = false;
      }, (response) => {
        // console.log(response)
        this.isLoading = false;
        this._snackBar.open("Invoice updating failed!", "Dismiss", this.commonService.snackConfig);
      }).catch((response) => {
        this.isLoading = false;
        this._snackBar.open("Invoice updating failed!", "Dismiss", this.commonService.snackConfig);
      });
    } else {
      this.invoicesService.post(model).then((response: any) => {
        if (!!response) {
          this.router.navigateByUrl('admin/invoices');
          this._snackBar.open("Invoice created successfully", "Dismiss", this.commonService.snackConfig);
        } else {
          this._snackBar.open("Invoice creating failed!", "Dismiss", this.commonService.snackConfig);
        }
        this.isLoading = false;
      }, (response) => {
        this.isLoading = false;
        this._snackBar.open("Invoice creating failed!", "Dismiss", this.commonService.snackConfig);
      }).catch((response) => {
        this.isLoading = false;
        this._snackBar.open("Invoice creating failed!", "Dismiss", this.commonService.snackConfig);
      });
    }
  }

  private getItem() {
    // const ratePatern = /^(0|0?[1-9]\d*)\.\d\d$/;
    // const quantityPatern = /^[0-9]*$/;
    return this.formBuilder.group({
      id: [0],
      description: ["", Validators.required],
      quantity: [0, [Validators.required]],
      rate: [0.00, [Validators.required]],
      itemTotalPrice: [{ value: 0.0, disabled: true }]
    });
  }

  addItem() {
    const control = <FormArray>this.invoiceForm.controls["invoiceItems"];
    control.push(this.getItem());
  }

  removeItem(i: number) {
    const control = <FormArray>this.invoiceForm.controls["invoiceItems"];
    control.removeAt(i);
  }

  getControls() {
    return (this.invoiceForm.get('invoiceItems') as FormArray).controls;
  }

  private updateTotalItemPrice(invoiceItems: any) {
    const control = <FormArray>this.invoiceForm.controls["invoiceItems"];
    this.totalSum = 0;
    for (let i in invoiceItems) {
      let totalItemPrice = invoiceItems[i].quantity * invoiceItems[i].rate;

      control
        .at(+i)
        .get("itemTotalPrice")
        .setValue(totalItemPrice, {
          onlySelf: true,
          emitEvent: false
        });

      this.totalSum += totalItemPrice;

      this.invoiceForm.patchValue({
        totalAmount: this.totalSum
      });
    }
  }

  get f() {
    return this.invoiceForm.controls;
  }

  quantityFilter(event: any) {
    const reg = /^[0-9]*$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }
}
