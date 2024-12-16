import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [NgIcon, NgIf],
  templateUrl: './header.component.html',
  viewProviders: [provideIcons({ heroMoon, heroSun })],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.handleCheckRoute();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.handleCheckRoute();
      });
  }
  handleCheckRoute() {
    if (this.router.url.includes('shows')) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }

  handleLogout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
