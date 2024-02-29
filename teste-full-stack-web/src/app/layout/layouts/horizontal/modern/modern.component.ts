import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FuseLoadingBarComponent, NgIf, MatButtonModule, MatIconModule, UserComponent, RouterOutlet],
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
    ) {
    }

    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
