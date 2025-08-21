import { Component } from '@angular/core';
import { ImageResizerComponent } from "./image-resizer/image-resizer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ImageResizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'photo-signature-app';
}
