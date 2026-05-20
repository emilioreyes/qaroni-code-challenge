import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ChildFormModel, MovieFormModel, PersonFormModel } from '../model/person-form.model';

interface PersonFormState {
    data:PersonFormModel
}

const initialState: PersonFormState = {
    data: {
        name: '',
        age: 0,
        children: [],
        movies: []
    }
}

const mockPersonWithoutChildren: PersonFormModel = {
    name: 'John Doe',
    age: 30,
    children: [],
    movies: [
        {
            name: 'The Shawshank Redemption',
            director: 'Frank Darabont',
            year: 1994,
            wonOscar: false
        },
        {
            name: 'The Godfather',
            director: 'Francis Ford Coppola',
            year: 1972,
            wonOscar: true
        }
    ]
}

const mockPersonWithOneChild: PersonFormModel = {
    name: 'Jane Doe',
    age: 28,
    children: [
        {
            name: 'Jack Doe',
            age: 5
        }
    ],
    movies: [
        {
            name: 'Inception',
            director: 'Christopher Nolan',
            year: 2010,
            wonOscar: true
        }
    ]
}

const mockPersonWithSeveralChildren: PersonFormModel = {
    name: 'Bob Smith',
    age: 40,
    children: [
        {
            name: 'Alice Smith',
            age: 10
        },
        {
            name: 'Charlie Smith',
            age: 8
        }
    ],
    movies: [
        {
            name: 'The Dark Knight',
            director: 'Christopher Nolan',
            year: 2008,
            wonOscar: true
        },
        {
            name: 'Pulp Fiction',
            director: 'Quentin Tarantino',
            year: 1994,
            wonOscar: true
        }
    ]
}

export const PersonFormStore = signalStore(
    {providedIn:'root'},
    withState(initialState),
    withComputed((store)=>({
        data:computed(()=>store.data()),
        hasChjildren: computed(()=>store.data().children.length > 0),
        hasMovies: computed(()=>store.data().movies.length > 0)
    })),
    withMethods((store)=>({
        reset(){
            patchState(store, initialState);
        },
        setData(data:PersonFormModel){
            patchState(store, {data});
        },
        setPersonData(name:string, age:number){
            patchState(store, {
                data: {
                    ...store.data(),
                    name,
                    age
                }
             });
        },
        setchildren(children:ChildFormModel[]){
            patchState(store, {
                data: {
                    ...store.data(),
                    children
                }
             });
        },
        setMovies(movies:MovieFormModel[]){
            patchState(store, {
                data: {
                    ...store.data(),
                    movies
                }
             });
        },
        loadMockPersonWithoutChildren(){
            patchState(store, {data: mockPersonWithoutChildren});
        },
        loadMockPersonWithOneChild(){
            patchState(store, {data: mockPersonWithOneChild});
        },
        loadMockPersonWithSeveralChildren(){
            patchState(store, {data: mockPersonWithSeveralChildren});
        } 

    }))

)