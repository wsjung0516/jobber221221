import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="p-5 mt-3 bg-blue-100 rounded">
        <div class="text-3xl">About</div>
        <p class=>
          Welcome to the about page.
        </p>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AboutComponent {

}
