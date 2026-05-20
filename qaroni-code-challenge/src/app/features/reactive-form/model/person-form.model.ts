export interface ChildFormModel{
    name: string;
    age: number;
}

export interface MovieFormModel{
    name: string;
    director: string;
    year: number;
    wonOscar: boolean;
}

export interface PersonFormModel{
    name: string;
    age: number;
    children: ChildFormModel[];
    movies: MovieFormModel[];
}
