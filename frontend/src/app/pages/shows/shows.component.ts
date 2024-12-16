import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { debounceTime, Subject } from 'rxjs';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

import { TShow, TShowType } from '../../../utils/types';
import { ShowsService } from '../../services/shows.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shows',
  imports: [NgIcon, RouterLink, NgForOf, NgClass, FormsModule, NgIf],
  templateUrl: './shows.component.html',
  viewProviders: [provideIcons({ heroMagnifyingGlass })],
})
export class ShowsComponent {
  constructor(
    private showsService: ShowsService,
    private toastr: ToastrService
  ) {}
  readonly movie = 'Movie';
  readonly tv_show = 'TV Show';
  private searchSubject = new Subject<string>();

  showData: TShow[] = [];
  showType: TShowType | undefined = undefined;
  searchTerm: string = '';
  page: number = 1;
  per_page: number = 15;
  total_pages: number = 0;
  is_loading: boolean = false;

  ngOnInit(): void {
    this.getShows();
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.handleSearch();
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  getShows(): void {
    this.is_loading = true;
    this.showsService
      .getAllShows({
        type: this.showType,
        search: this.searchTerm,
        page: this.page,
        per_page: this.per_page,
      })
      .subscribe({
        next: (data) => {
          this.showData = data?.data || [];
          this.total_pages = data?.meta?.total_pages || 0;
          this.is_loading = false;
        },
        error: (e) => {
          console.log(e);
          this.is_loading = false;
          this.toastr.error(e.error.message || 'Something went wrong');
        },
      });
  }

  handleSetCurrentType(currentType: TShowType) {
    this.showType = this.showType === currentType ? undefined : currentType;
    this.getShows();
  }

  handleSearch() {
    this.page = 1;
    this.getShows();
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }
}
