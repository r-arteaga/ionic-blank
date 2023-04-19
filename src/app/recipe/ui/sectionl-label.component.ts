import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-section-label',
  template: `
    <h3>{{ name }}</h3>
    `,
  styles: [`
    h3 {
      text-align: center;
      background: var(--ion-color-secondary);
      color: white;
      border-radius: 16px;
      padding: 8px;
    }
  `]
})
export class SectionLabelComponent {

  @Input() name!: string

}