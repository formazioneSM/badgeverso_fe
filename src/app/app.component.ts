import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './shared/uikit/services/auth/auth.service';
import { BachecaService } from './shared/uikit/services/bacheca/bacheca.service';
import { ToastService } from './shared/uikit/services/toast/toast.service';
import { slideInAnimation } from './shared/utils/animation';
import { Post } from './shared/utils/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'badgeverso';


@Output('undo') undo = new EventEmitter();

  constructor(
    public permissions: NgxPermissionsService,
    private router: Router,
    private authService: AuthService,
    private bachecaService: BachecaService, private contexts: ChildrenOutletContexts,
    private toastService: ToastService
  ) { }

  isAdminOrUser(token: any) {
    this.permissions.loadPermissions(token.admin ? ['ADMIN'] : ['USER']);
    this.router.navigate(['../home/bacheca']);
  }

  ngOnInit() {


    let token: any = localStorage.getItem('token');
    if (token) {
      let decodedToken: any = jwtDecode(token);
      this.isAdminOrUser(decodedToken);
      this.authService.setLoginResponse(decodedToken);
    }
  }

  undoAction() {

    switch (this.router.url) {
      case '/home/bacheca': {

        break;
      }
    }
  }

  getRouteAnimationData() {
      return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
