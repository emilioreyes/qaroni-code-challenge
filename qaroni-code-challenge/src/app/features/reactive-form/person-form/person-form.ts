import { Component, effect, inject } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { PersonFormStore } from '../store/person-form.store';
import { ChildFormModel, MovieFormModel, PersonFormModel } from '../model/person-form.model';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-person-form',
  imports: [ReactiveFormsModule,MatButtonModule,MatInputModule,MatRadioModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.scss',
})
export class PersonForm {
  readonly store = inject(PersonFormStore);
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.buildForm();

  constructor() {
    effect(() => {
      const data = this.store.data();
      this.setFormValue(data);
    });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      age: [''],
      children: this.formBuilder.array([]),
      movies: this.formBuilder.array([]),
    });
  }

  private createChildForm(child?:ChildFormModel){
    return this.formBuilder.group({
      name: new FormControl(child?.name || ''),
      age: new FormControl(child?.age || 0)
    });
  }

  private createMovieForm(movie?:MovieFormModel){
    return this.formBuilder.group({
      name: new FormControl(movie?.name || ''),
      director: new FormControl(movie?.director || ''),
      year: new FormControl(movie?.year || 0),
      wonOscar: new FormControl(movie?.wonOscar || false)
    });
  }
  private setFormValue(data:PersonFormModel){
    this.form.patchValue({
      name: data.name,
      age: data.age
    });

    this.getChildren().clear();
    data.children.forEach(child => {
      this.getChildren().push(this.createChildForm(child));
    });
    
    this.getMovies().clear();
    data.movies.forEach(movie => {
      this.getMovies().push(this.createMovieForm(movie));
    });
  }

  getChildren() {
    return this.form.get('children') as FormArray;
  }

  getMovies() {
    return this.form.get('movies') as FormArray;
  }

  removeChild(index: number) {
    this.getChildren().removeAt(index);
  }
 
  removeMovie(index: number) {
    this.getMovies().removeAt(index);
  }

  loadMockPersonWithoutChildren(){
    this.store.loadMockPersonWithoutChildren()
  }

  loadMockPersonWithOneChild(){
    this.store.loadMockPersonWithOneChild()
  }

  loadMockPersonWithSeveralChildren(){
    this.store.loadMockPersonWithSeveralChildren()
  }

  resetFormstate(){
    this.store.reset();
  }

  showForm() {
    console.log(this.form.value);
  }
}
