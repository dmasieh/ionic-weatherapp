import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  state:string;
  city:string;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    //public navCtrl: Nav,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage:Storage) {
    
    this.storage.get('location').then((val) => {
      if(val != null){
        let location = JSON.parse(val);
        this.state = location.state;
        this.city = location.city;
      } else {
        this.state = 'NY';
        this.city = 'New York'
      }
    });
  

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  saveForm(){
    let location = {
      state: this.state,
      city: this.city
    }
    alert("You have Successfully changed the city!");
    this.storage.set('location', JSON.stringify(location));
    //this.nav.push(HomePage);
    this.nav.push(HomePage);
    //this.getRootNav(HomePage).push();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  

}
