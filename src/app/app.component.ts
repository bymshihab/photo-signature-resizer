import { Component } from '@angular/core';
import { ImageResizerComponent } from "./image-resizer/image-resizer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImageResizerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'photo-signature-app';

  ngOnInit() {
    // Just detect Facebook app, don't redirect automatically
    // The warning will be shown in the template
  }

  isFacebookApp(): boolean {
    const ua = navigator.userAgent || navigator.vendor || (window as any)['opera'];
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
  }

  openInBrowser() {
    // For Facebook in-app browser, we need to use location.href to exit Facebook environment
    // This will prompt the user to open in their default browser
    if (confirm('This will open the app in your device\'s default browser (Chrome, Safari, etc.) for full functionality. Continue?')) {
      // Force exit from Facebook by using location.href instead of window.open
      window.location.href = 'https://photo-signature-resizer.vercel.app/';
    }
  }
}
