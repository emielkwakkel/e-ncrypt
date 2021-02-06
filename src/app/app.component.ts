import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public darkModeEnabled = this.settingsService.isDarkModePreferred().matches;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private settingsService: SettingsService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.subscription = this.settingsService.darkModeEnabled$.subscribe((darkModeEnabled: boolean) => {
      this.darkModeEnabled = darkModeEnabled;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
