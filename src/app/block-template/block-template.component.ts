import { Component } from '@angular/core';

@Component({
  selector: 'block-temp',
  styles: [`
    :host {
      text-align: center;
      color: #1976D2;
    }
  `],
  template: `
    <div class="block-ui-template">
      <img src="./assets/img/logo_init.png">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      <div><strong>Espere porfavor...</strong></div>
    </div>
  `
})
export class BlockTemplateComponent { }
