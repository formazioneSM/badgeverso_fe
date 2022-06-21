import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgxPermissionsService } from 'ngx-permissions';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/uikit/services/auth/auth.service';
import { BachecaService } from './shared/uikit/services/bacheca/bacheca.service';
import { ToastService } from './shared/uikit/services/toast/toast.service';
import { slideInAnimation } from './shared/utils/animation';
import { Post } from './shared/utils/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'badgeverso';
  rottaAttuale: string = '';

  @Output('undo') undo = new EventEmitter();

  constructor(
    public permissions: NgxPermissionsService,
    private router: Router,
    private authService: AuthService,
    private contexts: ChildrenOutletContexts
  ) {}

  isAdminOrUser(token: any) {
    this.permissions.loadPermissions(token.admin ? ['ADMIN'] : ['USER']);
  }

  ngOnInit() {
    let token: any = localStorage.getItem('token');
    if (token) {
      this.authService.checkTokenValidity().subscribe(
        (res) => {
          let decodedToken: any = jwtDecode(token);
          this.isAdminOrUser(decodedToken);
          this.authService.setLoginResponse(decodedToken);
        },
        (err) => {
          localStorage.removeItem('token');

          this.router.navigate(['/login']);
        }
      );
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
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
