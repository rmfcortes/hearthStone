import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  loader: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'dark',
      buttons: [
        {
          text: 'Enterado',
          role: 'cancel',
        }
      ]
    });
    await toast.present();
  }

  async presentToastTime(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      color: 'dark',
      duration
    });
    await toast.present();
  }

  async presentLoading(message: string) {
    this.loader = await this.loadingCtrl.create({
     spinner: 'crescent',
      message
    });
    return await this.loader.present();
  }

  dismissLoading() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }

  async presentAlert(header: string, message): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [{
          text: 'OK',
          handler: () => resolve()
        }]
      });

      await alert.present();
    });
  }

}
