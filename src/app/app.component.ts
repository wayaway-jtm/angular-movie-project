import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EastereggComponent } from './easteregg/easteregg.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}
  title = 'angular-movie-project';

  openDialog(): void {

   this.dialog.open(EastereggComponent, {
      width: 'fit-content',  
    });
    // ref.afterClosed().subscribe(result => {
    //   this.onSubmit(result);
    // });
  }
}

