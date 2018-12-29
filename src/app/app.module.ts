import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MapaModule } from './mapa/mapa.module';
import { MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        MatTabsModule,
        AppRoutingModule,
        MapaModule,
        MatToolbarModule
    ],
    bootstrap: [AppComponent],
    providers: [ { provide: LOCALE_ID, useValue: 'pt-BR' } ],
})
export class AppModule { }
