import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompoundGalleryComponent } from './components/compound-gallery/compound-gallery.component';
import { CompoundDetailComponent } from './components/compound-detail/compound-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compounds', component: CompoundGalleryComponent },
  { path: 'compounds/:id', component: CompoundDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
