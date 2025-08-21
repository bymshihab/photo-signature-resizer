import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-resizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.css']
})
export class ImageResizerComponent {
photoPreview: string | null = null;
  signaturePreview: string | null = null;

  async onFileChange(event: Event, type: 'photo' | 'signature') {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;

    const file = target.files[0];
    const img = await this.loadImage(file);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Set target size
    if (type === 'photo') {
      canvas.width = 300;
      canvas.height = 300;
    } else {
      canvas.width = 300;
      canvas.height = 80;
    }

    // Draw image scaled
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convert to Base64 and check file size
    let resizedData = await this.compressImageToSize(canvas, type);

    if (type === 'photo') this.photoPreview = resizedData;
    else this.signaturePreview = resizedData;
  }

  compressImageToSize(canvas: HTMLCanvasElement, type: 'photo' | 'signature'): Promise<string> {
    return new Promise((resolve) => {
      const maxSizeKB = type === 'photo' ? 100 : 60;
      const maxSizeBytes = maxSizeKB * 1024;

      let quality = 0.9;
      let result = canvas.toDataURL('image/jpeg', quality);

      // Calculate approximate file size from base64 string
      const getFileSizeFromBase64 = (base64: string): number => {
        const base64Data = base64.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        return Math.ceil((base64Data.length * 3) / 4); // Approximate bytes from base64
      };

      // Reduce quality until file size is within limit
      while (getFileSizeFromBase64(result) > maxSizeBytes && quality > 0.1) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality);
      }

      // If still too large, reduce canvas size
      if (getFileSizeFromBase64(result) > maxSizeBytes) {
        const ctx = canvas.getContext('2d')!;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Reduce dimensions by 10% and try again
        const scaleFactor = 0.9;
        canvas.width = Math.floor(canvas.width * scaleFactor);
        canvas.height = Math.floor(canvas.height * scaleFactor);

        // Redraw with smaller dimensions
        ctx.putImageData(imageData, 0, 0);
        result = canvas.toDataURL('image/jpeg', quality);
      }

      resolve(result);
    });
  }

  loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = e.target?.result as string;
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  clearAll() {
    this.photoPreview = null;
    this.signaturePreview = null;

    // Clear file inputs
    const photoInput = document.querySelector('input[type="file"]:nth-of-type(1)') as HTMLInputElement;
    const signatureInput = document.querySelector('input[type="file"]:nth-of-type(2)') as HTMLInputElement;

    if (photoInput) photoInput.value = '';
    if (signatureInput) signatureInput.value = '';
  }

  downloadImage(base64: string, filename: string) {
    const link = document.createElement('a');
    link.href = base64;
    link.download = filename;
    link.click();
  }
}
