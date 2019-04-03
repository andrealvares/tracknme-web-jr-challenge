import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';  

//Componentes
import { TrackNMeComponent } from './tracknme.component';
import { TrackNMeRouting } from './tracknmerouting.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrackNMeRouting,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild([
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvejelaJOdaf7pwi74B9HFj99oPcWU3-Y'
    }),
    AgmDirectionModule
  ],
  declarations: [
    TrackNMeComponent
  ],
  exports: [
    TrackNMeComponent
  ]
})
export class TrackNMeModule { }
