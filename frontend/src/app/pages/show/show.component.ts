import { Component } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { ActivatedRoute } from '@angular/router';
import { TShow } from '../../../utils/types';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-show',
  imports: [NgIf],
  templateUrl: './show.component.html',
})
export class ShowComponent {
  constructor(
    private showService: ShowsService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  showData: TShow | null = null;
  is_loading: boolean = false;

  ngOnInit(): void {
    this.handleGetShow();
  }

  handleGetShow() {
    const showId = this.route.snapshot.paramMap.get('id');
    if (!showId) {
      this.toastr.error('Please provide a show id!');
      return;
    }

    this.showService.getSingleShow(showId).subscribe({
      next: (data) => {
        this.showData = data.data;
        this.is_loading = false;
      },
      error: (e) => {
        console.log(e);
        this.is_loading = false;
        this.toastr.error(e.error.message || 'Something went wrong');
      },
    });
  }
}
