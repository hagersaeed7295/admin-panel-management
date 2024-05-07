import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/dataModels/user/User';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  
  username: string = '';
  user: User = {
    Id: 0,
    UserName: '',
    Password: undefined,
    PreferredLanguage: '',
    token: undefined
  };

  isLoggedIn = false;
  isLoginFailed = false;
  loading:boolean = false;

  constructor( 
    private storageService: StorageService,
    private apiService: ApiService) {
  }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUser().UserName;
      window.location.href = '/admin/dashboard';
    }

   }

  async onSubmit() {
    this.loading = true;
    if (this.form.username) {
      let getToken = await this.apiService.doPost('auth/login'
      , this.form);
      if(getToken){
        this.user = {
          Id: 0,
          UserName: this.form.username,
          Password: this.form.password,
          PreferredLanguage: 'en',
          token : getToken.token
        };

        this.storageService.saveUser(this.user);
        this.username = this.storageService.getUser().UserName;
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.reloadPage();
      }else{
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        this.loading = false;
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
