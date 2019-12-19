import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type = '1';

  constructor(private router: Router, private appService: AppService) { }

  onSubmit() {
    console.log(this.type);
    this.appService.setUserTye(this.type);
    this.router.navigate(['white-list']);
  }

  ngOnInit() {
  }

}
