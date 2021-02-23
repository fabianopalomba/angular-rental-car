import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  form = new FormGroup({});
  local_data:any;
  action:string;
  previous_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.local_data = {...data.dati};
    this.previous_data = {...data.dati};
    this.action = data.action;
    console.log(data.dati)
    Object.keys(data.dati).map((key)=>{
      this.form.addControl(key, new FormControl())
    })
  }

  doAction(){
    Object.keys(this.local_data).map((key)=>{
      this.local_data[key] = this.form.get(key).value;
    })
    this.dialogRef.close({event:this.action,data:{actual_data: this.local_data, previous_data: this.previous_data}});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  convertDate(any){
    if (any instanceof Date) return any.toLocaleDateString()
    else return any;
  }
}
