import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class MaterialModule { }
