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
    if (this.isFacebookApp()) {
      // Redirect to open in default browser
      window.location.href = 'https://your-app-url.com';
      alert('Please open this app in a browser like Chrome or Safari for full functionality.');
    }
  }

  isFacebookApp(): boolean {
    const ua = navigator.userAgent || navigator.vendor || (window as any)['opera'];
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
  }
}
