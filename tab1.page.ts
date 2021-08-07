import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tabtitle = "Grocery List";
  items = [];
  errorMessage: string;

constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceService, public inputDialog: InputDialogService, private socialSharing: SocialSharing) 
{
  this.dataService.dataChanged$.subscribe(
    (dataChanged: boolean) => this.loadItems();
  );
} 
  
ionViewDidLoad() {
  this.loadItems();
}


  loadItems() {
    return this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);

  }

  removeItem (id){
    this.dataService.removeItem(id);
  }

  
  async presentToast(item, index) {
    const toast = await this.toastController.create({
      message: 'your item has been removed from the list',
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(index)
  }

  async shareItem(item, index) {
    const toast = await this.toastController.create({
      message: 'your item has been shared',
      duration: 2000
    });
    toast.present();

    let message = "Grocery Item:" + item.name + "Quantity:" + item.quantity;
    let subject = "Grocery Items";
    // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Successfully shared")
    }).catch((error) => {
      console.error("error while sharing")
      // Sharing via email is not possible
    });

  }

  async editItem(item, index) {
    const toast = await this.toastController.create({
      message: 'your item has been edited' ,
      duration: 2000
    });
    toast.present();
    console.log("testing"); 
    this.inputDialog.showPrompt(item, index);
  }

  additem() {
    console.log("Item Added");
    this.inputDialog.showPrompt();
  }

  
}



