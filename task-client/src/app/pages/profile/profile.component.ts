import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  employee: any;
  colCountByScreen: object;

  constructor(private authService: AuthService) {
    this.authService.getUser().then((user) => {
      this.employee = {
        FirstName: user.data?.name,
        Picture: 'images/employees/06.png',
      };
    });

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    };
  }
}
