import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
})
export class AboutPage {
  title = 'About';

  browserOpen(url: string) {
    Browser.open({ url });
  }
}
