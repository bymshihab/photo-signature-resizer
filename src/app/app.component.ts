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
  appUrl = 'https://photo-signature-resizer.vercel.app/';
  copySuccess = false;

  ngOnInit() {
    // Just detect Facebook app, don't redirect automatically
    // The warning will be shown in the template
  }

  isFacebookApp(): boolean {
    const ua = navigator.userAgent || navigator.vendor || (window as any)['opera'];
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.appUrl);
      this.copySuccess = true;

      // Reset the success message after 3 seconds
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);

    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(this.appUrl);
    }
  }

  fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      this.copySuccess = true;

      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);

    } catch (err) {
      console.error('Fallback: Could not copy text: ', err);
    }

    document.body.removeChild(textArea);
  }

  openInBrowser() {
    // Try to open in browser (may not work in Facebook)
    window.location.href = this.appUrl;
  }
}
