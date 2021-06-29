import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { Network } from '@capacitor/network';

@Injectable()
export class ConnectivityChecker {

    onDevice: boolean;
    online = new BehaviorSubject<boolean>(true);

    constructor(
        private ngZone: NgZone,
        public platform: Platform,
    ) {
        this.onDevice = this.platform.is('capacitor');
    }

    watchNetwork(): void {
        if (this.onDevice) {
            Network.addListener('networkStatusChange', status => {
                console.log('Network status changed', status);
                this.ngZone.run(() => this.online.next(status.connected));
            });
        } else {
            window.addEventListener('online', () => this.ngZone.run(() => this.online.next(true)));
            window.addEventListener('offline', () => this.ngZone.run(() => this.online.next(false)));
        }
    }

}
