import { Injectable } from "@angular/core";
import { Gender } from "../models/gender";
import { BehaviorSubject, Observable, combineLatestWith, map, of, take, tap } from "rxjs";
import { IngredientCategory } from "../models/ingredient-categories";
import { Ingredient } from "../models/ingredient";
import { Food } from "../models/food";
import { foods } from "../mock-data";
import { SuggestedFood } from "../models/suggested-food";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _gender$ = new BehaviorSubject<Gender | null>(null);
  gender$ = this._gender$.asObservable();

  private _ingredientCategories$ = new BehaviorSubject<IngredientCategory[]>([]);
  get ingredientCategories$() {
    if (!this._ingredientCategories$.getValue().length) {
      this.actionSetIngredientCategories()
    }
    return this._ingredientCategories$.asObservable();
  }


  private _ingredients$ = new BehaviorSubject<Ingredient[]>([]);
  get ingredients$() {
    if (!this._ingredients$.getValue().length) {
      this.actionSetIngredients();
    }
    return this._ingredients$.asObservable()
  }

  private _foods$ = new BehaviorSubject<Food[]>([])
  get foods$() {
    if (!this._foods$.getValue().length) {
      this.actionSetFoods();
    }
    return this._foods$.asObservable()
  }

  get foodsMap$() {
    return this.foods$.pipe(
      map(foods => {
        return new Map<number, Food>(foods.entries())
      })
    )
  }

  private _suggesetedFoods$ = new BehaviorSubject<SuggestedFood[]>([])
  suggestedFoods$ = this._suggesetedFoods$.asObservable();

  get selectedIngredCategory$() {
    return this.ingredientCategories$.pipe(map((cats => {

      let found = cats.find(cat => cat.isActive);

      // if there's no active cat then use the first one as fallback
      if (!found) {
        found = cats[0];
        this._ingredientCategories$.next(
          cats.map((cat, i) => {
            if (i === 0) { cat.isActive = true; }
            return cat
          })
        )
      }
      return found
    })))
  }

  get filteredIngreds$(){
    return this.ingredients$.pipe(
      combineLatestWith(this.selectedIngredCategory$),
      map(([ingreds, currentCat]) => {
        return ingreds.filter(ingred => {
          return ingred.category === currentCat.id;
        })
      })
    )
  }

  get selectedIngreds$(){
    return this.ingredients$.pipe(map(ingreds => {
      return ingreds.filter(ingred => ingred.isSelected)
    }))
  }


  private actionUpdateSelectedCountInCategory() {
    this.selectedIngreds$.pipe(
      combineLatestWith(this.ingredientCategories$),
      take(1),
      tap(([selectedIngreds, ingredCategories]) => {
        this._ingredientCategories$.next(
          ingredCategories.map(cat => {
            cat.selectedCount = selectedIngreds.filter(ingred => ingred.category === cat.id).length
            return cat;
          })
        )
      })
    ).subscribe()
  }



  private actionSetIngredients() {
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
      {
        id: 7,
        label: 'برنج',
        category: 3,
        isSelected: false
      },
    ]);
  }


  private actionSetIngredientCategories() {
    this._ingredientCategories$.next([
      {
        label: 'سبزیجات',
        id: 0,
        selectedCount: 0,
        isActive: false
      },
      {
        label: 'لبنیات',
        id: 1,
        selectedCount: 0,
        isActive: false
      },
      {
        label: 'گوشت',
        id: 2,
        selectedCount: 0,
        isActive: false
      },
      {
        label: 'غلات',
        id: 3,
        selectedCount: 0,
        isActive: false
      },
    ]);
  }

  private actionSetFoods() {
    this._foods$.next(foods);
  }

  actionSetGender(gender: Gender) {
    this._gender$.next(gender)
  }


  actionSelectIngredient(selectedIngred: Ingredient) {
    this.ingredients$.pipe(
      take(1),
      tap(ingreds => {
        this._ingredients$.next(ingreds.map(ingred => {
          if(ingred.id === selectedIngred.id){
            ingred.isSelected = !ingred.isSelected
          }
          return ingred
        }))

        this.actionUpdateSelectedCountInCategory()
      })
    ).subscribe()
  }

  actionSelectCategory(selectedCategory: IngredientCategory) {
    this.ingredientCategories$.pipe(
      take(1),
      tap(cats => {
        this._ingredientCategories$.next(
          cats.map(cat => {
            cat.isActive = false;
            if (cat.id === selectedCategory.id) {
              cat.isActive = true;
            }
            return cat;
          })
        )
      })
    ).subscribe()
  }



  actionGetRecipes() {

    this.selectedIngreds$.pipe(
      combineLatestWith(this.foods$),
      take(1),
      tap(([selectedIngreds, foods]) => {
        const selectedIngredsId = selectedIngreds.map(ingred => ingred.id);
        const suggestedFoods = foods.map(food => {
          const resemblance = food.ingredients.reduce((result, currIngred) => {
            if(selectedIngredsId.includes(currIngred)){
              result++
            }
            return result;
          },0) / food.ingredients.length


          return {
            ...food,
            resemblance
          }
        })
        suggestedFoods.sort((a,b) => b.resemblance - a.resemblance)

        this._suggesetedFoods$.next(suggestedFoods)
      })
    ).subscribe()
 }
}