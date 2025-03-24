import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatExpansionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatBadgeModule]
})
export class MaterialModule {}
