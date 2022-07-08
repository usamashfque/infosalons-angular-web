import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "admin/invoices",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: 'admin',
    redirectTo: "admin/invoices",
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "invoices",
        component: InvoicesComponent,
      },
      {
        path: "invoice",
        component: InvoiceComponent,
      }
    ],
  },
  {
    path: "***",
    redirectTo: "admin",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
