import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.css']
})
export class WhiteListComponent implements OnInit {
  public userType;
  public myForm: FormGroup;
  public btnEnable = false;
  private storage = sessionStorage;

  constructor(private router: Router, private appService: AppService, private fb: FormBuilder) {
    this.userType = this.appService.getUserType();
  }

  logout() {
    this.appService.setUserTye('');
    this.router.navigate(['/']);
  }

  ngOnInit() {

  this.myForm = this.fb.group({
    itemRows: this.fb.array([this.initItemRows()])

  });
  this.myForm.valueChanges.subscribe(newValue => {
    const rows = newValue.itemRows;
    this.btnEnable = false;
    rows.forEach(row => {
      if (row.ip.trim() !== '' ) {
        this.btnEnable = true;
      }
    });
  });
  }

  initItemRows() {
    return this.fb.group({
      'ip': new FormControl('', [Validators.pattern('([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})')]),
    });
  }

  addNewRow() {
    if ((this.userType === '1' && this.myForm.value.itemRows.length < 5 ) ||
     (this.userType === '2' && this.myForm.value.itemRows.length < 10 )) {
      this.formArr.push(this.initItemRows());
    }

  }

  get formArr() {
    return this.myForm.get('itemRows') as FormArray;
  }

  deleteRow(index: number) {
    if (this.myForm.value.itemRows.length === 1){
      this.myForm.value.itemRows[index].ip = '';
      this.myForm.get('itemRows')['controls'][0].patchValue({ip: ''});
      return;
    }
    this.formArr.removeAt(index);
  }

  onSubmit() {
    const ips =  this.myForm.value.itemRows.filter(row => {if (row.ip) {return row.ip; }});
    this.storage.setItem('ip', JSON.stringify(ips));
  }

}
