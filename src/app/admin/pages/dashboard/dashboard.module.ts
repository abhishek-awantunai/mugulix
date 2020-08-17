import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardService } from './dashboard.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'category-list', component: CategoryListComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    CategoryListComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMultiSelectModule,
    FormsModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
