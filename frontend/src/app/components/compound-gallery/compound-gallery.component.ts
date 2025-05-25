import { Component, OnInit } from '@angular/core';
import { CompoundService, Compound } from '../../services/compound.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compound-gallery',
  templateUrl: './compound-gallery.component.html',
  styleUrls: ['./compound-gallery.component.css']
})
export class CompoundGalleryComponent implements OnInit {

  allCompounds: Compound[] = [];
  filteredCompounds: Compound[] = [];  // filtered after search
  compounds: Compound[] = [];
  totalCompounds = 0;
  pageSize = 10;
  pageIndex = 0;
  isLoading = false;
  searchTerm: string = '';  // search input model

  constructor(private compoundService: CompoundService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllCompounds();
  }

  loadAllCompounds() {
    this.isLoading = true;
    this.compoundService.getAllCompounds().subscribe({
      next: (response) => {
        this.allCompounds = response;
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to load compounds.');
      }
    });
  }

  applyFilter() {
    if (this.searchTerm.trim()) {
      const lowerSearch = this.searchTerm.toLowerCase();
      this.filteredCompounds = this.allCompounds.filter(c =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.description.toLowerCase().includes(lowerSearch)
      );
    } else {
      this.filteredCompounds = [...this.allCompounds];
    }
    this.totalCompounds = this.filteredCompounds.length;
    this.pageIndex = 0;  // reset page index on filter
    this.setPageData();
  }

  setPageData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.compounds = this.filteredCompounds.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPageData();
  }

  onSearchChange() {
    this.applyFilter();
  }

  goToDetails(id: number) {
    this.router.navigate(['/compounds', id]);
  }
}
