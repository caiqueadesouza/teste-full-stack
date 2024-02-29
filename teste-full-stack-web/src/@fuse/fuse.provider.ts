import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FuseConfig } from '@fuse/services/config';
import { FUSE_CONFIG } from '@fuse/services/config/config.constants';
import { fuseLoadingInterceptor, FuseLoadingService } from '@fuse/services/loading';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FusePlatformService } from '@fuse/services/platform';

export type FuseProviderConfig = {
    mockApi?: {
        delay?: number;
        services?: any[];
    },
    fuse?: FuseConfig
}

/**
 * Fuse provider
 */
export const provideFuse = (config: FuseProviderConfig): Array<Provider | EnvironmentProviders> => {
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: FUSE_CONFIG,
            useValue: config?.fuse ?? {},
        },

        provideHttpClient(withInterceptors([fuseLoadingInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseLoadingService),
            multi: true,
        },

        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseMediaWatcherService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FusePlatformService),
            multi: true,
        }
    ];

    // Return the providers
    return providers;
};
