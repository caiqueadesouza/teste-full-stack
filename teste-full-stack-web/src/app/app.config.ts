import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideFuse } from '@fuse';
import { appRoutes } from 'app/app.routes';
import { MatPaginatorIntlBr } from './_helpers/br-paginator-intl.model';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr },
        { provide: LOCALE_ID, useValue: 'pt' },

        { provide: LocationStrategy, useClass: HashLocationStrategy },

        provideAnimations(),
        provideHttpClient(),
        provideRouter(appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
        ),
        {
            provide: DateAdapter,
            useClass: LuxonDateAdapter,
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'D',
                },
                display: {
                    dateInput: 'D',
                    monthYearLabel: 'LLL yyyy',
                    dateA11yLabel: 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },

        provideFuse({
            fuse: {
                layout: 'classy',
                scheme: 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme: 'theme-default',
                themes: [
                    {
                        id: 'theme-default',
                        name: 'Default',
                    }
                ],
            },
        }),
    ],
};
