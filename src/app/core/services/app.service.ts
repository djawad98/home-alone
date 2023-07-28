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

  private _filteredIngredients$ = new BehaviorSubject<Ingredient[]>([])
  filteredIngredients$ = this._filteredIngredients$.asObservable()

  private _selectedIngredients$ = new BehaviorSubject<Ingredient[]>([])
  selectedIngredients$ = this._selectedIngredients$.asObservable();

  constructor() {
    this._ingredientCategories$.next([
      {
        label: 'سبزیجات',
        id:0,
        selectedCount: 0
      },
      {
        label: 'لبنیات',
        id:1,
        selectedCount: 0
      },
      {
        label: 'گوشت',
        id:2,
        selectedCount: 0
      },
    ])

    this._ingredients$.next([
      {
        id: 0,
        label: 'شوید',
        category: 0,
        isSelected: false
      },
      {
        id: 1,
        label: 'گشنیز',
        category: 0,
        isSelected: false
      },
      {
        id: 2,
        label: 'جعفری',
        category: 0,
        isSelected: false
      },
      {
        id: 3,
        label: 'پیازچه',
        category: 0,
        isSelected: false
      },
      {
        id: 4,
        label: 'مرغ',
        category: 2,
        isSelected: false
      },
      {
        id: 5,
        label: 'شیر',
        category: 1,
        isSelected: false
      },
      {
        id: 6,
        label: 'کالباس',
        category: 2,
        isSelected: false
      },
    ])

    this._currentCategory$.next(this._ingredientCategories$.getValue()![0])

    this._currentCategory$.subscribe(currentCategory => {
      if(currentCategory){
        this._filteredIngredients$.next(this.getCategoryIngredients(currentCategory))
      }
    })

    this._selectedIngredients$.subscribe(selectedIngredients => {
      const filterdIngredients = this._filteredIngredients$.getValue();
      const selectedIngredientsId = selectedIngredients.map(ingred => ingred.id)
      filterdIngredients.map(ingred => {
        if(selectedIngredientsId.includes(ingred.id)){
          ingred.isSelected = true;
        } else {
          ingred.isSelected = false;
        }

        return ingred;
      })

      const categories = this._ingredientCategories$.getValue();
      categories?.map(cat => {
        cat.selectedCount = selectedIngredients.filter(ingred => ingred.category === cat.id).length
        return cat;
      })
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

  selectIngredient(ingred: Ingredient){
    const selectedIngredients = this._selectedIngredients$.getValue();
    const selectedIngredientsId = selectedIngredients.map(ingred => ingred.id);
    if(selectedIngredientsId.includes(ingred.id)){
      const deleteIndex = selectedIngredientsId.indexOf(ingred.id)
      selectedIngredients.splice(deleteIndex,1)
    } else {
      selectedIngredients.push(ingred);
    }
    this._selectedIngredients$.next(selectedIngredients)
  }
}