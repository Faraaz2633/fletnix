import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private access_token = localStorage.getItem('token');

  ngOnInit(): void {
    this.authService.validate({ access_token: this.access_token }).subscribe({
      next: () => {
        this.router.navigate(['/shows']);
      },
      error: (e) => {
        this.toastr.error(e.error.message);
        localStorage.removeItem('token');
        this.router.navigate(['/auth']);
      },
    });
  }
}
