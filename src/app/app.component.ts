import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showModal = false;

  showAddChannelPopup(){
    this.showModal = true;
  }

  closeAddchannelPopup(){
    this.showModal = false;
  }
}
