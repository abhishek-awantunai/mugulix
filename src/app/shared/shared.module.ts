import { NgModule } from '@angular/core';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/commonService';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [HttpClientModule],
  providers: [DataService, CommonService],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class SharedModule {}
