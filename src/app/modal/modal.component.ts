import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  closeResult: string;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
      // Stuff
  }

  openModal(id: string) {
  
  }

  closeModal(id: string) {
 
  }

  
}
