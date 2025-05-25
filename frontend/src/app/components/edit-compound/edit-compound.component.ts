import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompoundService, Compound } from '../../services/compound.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-compound',
  templateUrl: './edit-compound.component.html',
  styleUrls: ['./edit-compound.component.css']
})
export class EditCompoundComponent implements OnInit {
  compoundId!: number;
  compoundForm!: FormGroup;
  isLoading = true;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.compoundId = Number(this.route.snapshot.paramMap.get('id'));
    this.compoundForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.compoundService.getCompound(this.compoundId).subscribe({
      next: (compound) => {
        this.compoundForm.patchValue({
          name: compound.name,
          image: compound.image,
          description: compound.description
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Failed to load compound.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
        this.router.navigate(['/compounds']);
      }
    });
  }

  onSubmit() {
    if (this.compoundForm.invalid) return;
    this.isSubmitting = true;
    this.compoundService.updateCompound(this.compoundId, this.compoundForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open('Compound updated successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        this.router.navigate(['/compounds', this.compoundId]);
      },
      error: () => {
        this.isSubmitting = false;
        this.snackBar.open('Failed to update compound.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }
} 