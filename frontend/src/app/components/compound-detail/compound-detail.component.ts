import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompoundService, Compound } from '../../services/compound.service';

@Component({
  selector: 'app-compound-detail',
  templateUrl: './compound-detail.component.html',
  styleUrls: ['./compound-detail.component.css']
})
export class CompoundDetailComponent implements OnInit {
  compound!: Compound;
  isLoading = true;

  constructor(private route: ActivatedRoute, private compoundService: CompoundService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.compoundService.getCompound(id).subscribe({
      next: (data) => {
        this.compound = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Compound not found.');
      }
    });
  }
}
