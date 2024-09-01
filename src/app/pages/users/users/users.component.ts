import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private userService: UserService){}

  usersData: Array<any> = [];
  
  ngOnInit(): void {
    
    this.userService.getAllUsers().subscribe({
      next: (resp) => {
        console.log(resp);
        this.usersData = resp;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
;

}
