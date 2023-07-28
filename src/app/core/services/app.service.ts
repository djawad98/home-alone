import { Injectable } from "@angular/core";
import { Gender } from "../models/gender";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IngredientCategory } from "../models/ingredient-categories";
import { Ingredient } from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _gender$ = new BehaviorSubject<Gender | null>(null);
  gender$ = this._gender$.asObservable();

  private _ingredientCategories$ = new BehaviorSubject<IngredientCategory[] | null>(null);
  ingredientCategories$ = this._ingredientCategories$.asObservable();

  private _currentCategory$ = new BehaviorSubject<IngredientCategory | null>(null);
  currentCategory$ = this._currentCategory$.asObservable();

  private _ingredients$ = new BehaviorSubject<Ingredient[] | null>(null);
  ingredients$ = this._ingredients$.asObservable();

  private _filteredIngredients$ = new BehaviorSubject<Ingredient[] | null>(null)
  filteredIngredients$ = this._filteredIngredients$.asObservable()


  constructor() {
    this._ingredientCategories$.next([
      {
        label: 'سبزیجات',
        id:0
      },
      {
        label: 'لبنیات',
        id:1
      },
      {
        label: 'گوشت',
        id:2
      },
    ])

    this._ingredients$.next([
      {
        label: 'شوید',
        category: 0
      },
      {
        label: 'گشنیز',
        category: 0
      },
      {
        label: 'مرغ',
        category: 2
      },
      {
        label: 'شیر',
        category: 1
      },
      {
        label: 'کالباس',
        category: 2
      },
    ])

    this._currentCategory$.next(this._ingredientCategories$.getValue()![0])

    this._currentCategory$.subscribe(currentCategory => {
      if(currentCategory){
        this._filteredIngredients$.next(this.getCategoryIngredients(currentCategory))
      }
    })
  }

  setGender(gender: Gender) {
    this._gender$.next(gender)
  }

  getCategoryIngredients(category: IngredientCategory): Ingredient[] {
    const allIngreds = this._ingredients$.getValue();
    if (!allIngreds) return []

    const filtered = allIngreds.filter(ingred => {
      return ingred.category === category.id
    })

    return filtered
  }

  selectCategory(category: IngredientCategory){
    this._currentCategory$.next(category)
  }
}