import { Injectable, inject } from "@angular/core";
import { Gender } from "../models/gender";
import { BehaviorSubject, combineLatestWith, map, of, take, tap } from "rxjs";
import { IngredientCategory } from "../models/ingredient-categories";
import { Ingredient } from "../models/ingredient";
import { Food } from "../models/food";
import { foods } from "../mock-data";
import { SuggestedFood } from "../models/suggested-food";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private http = inject(HttpClient)
  private _gender$ = new BehaviorSubject<Gender | null>(null);
  gender$ = this._gender$.asObservable();

  private _ingredCategories$ = new BehaviorSubject<IngredientCategory[]>([]);
  ingredCategories$ = this._ingredCategories$.asObservable();


  private _ingreds$ = new BehaviorSubject<Ingredient[]>([]);
  ingreds$ = this._ingreds$.asObservable()

  private _foods$ = new BehaviorSubject<Food[]>([])
  foods$ = this._foods$.asObservable()

  get foodsMap$() {
    return this.foods$.pipe(
      map(foods => {
        return new Map<number, Food>(foods.entries())
      })
    )
  }

  private _suggestedFoods$ = new BehaviorSubject<SuggestedFood[]>([])
  suggestedFoods$ = this._suggestedFoods$.asObservable();

  get selectedIngredCategory$() {
    return this.ingredCategories$.pipe(map((cats => {

      let found = cats.find(cat => cat.isActive);

      // if there's no active cat then use the first one as fallback
      if (!found) {
        found = cats[0];
        this._ingredCategories$.next(
          cats.map((cat, i) => {
            if (i === 0) { cat.isActive = true; }
            return cat
          })
        )
      }
      return found
    })))
  }

  get selectedCategoryIngreds$(){
    return this.ingreds$.pipe(
      combineLatestWith(this.selectedIngredCategory$),
      map(([ingreds, currentCat]) => {
        return ingreds.filter(ingred => {
          return ingred.category === currentCat.id;
        })
      })
    )
  }

  get selectedIngreds$(){
    return this.ingreds$.pipe(map(ingreds => {
      return ingreds.filter(ingred => ingred.isSelected)
    }))
  }


  updateSelectedCountInCategory() {
    this.selectedIngreds$.pipe(
      combineLatestWith(this.ingredCategories$),
      take(1),
      tap(([selectedIngreds, ingredCategories]) => {
        this._ingredCategories$.next(
          ingredCategories.map(cat => {
            cat.selectedCount = selectedIngreds.filter(ingred => ingred.category === cat.id).length
            return cat;
          })
        )
      })
    ).subscribe()
  }



  loadIngredients() {
    this._ingreds$.next([
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


  loadIngredCategories() {
    this._ingredCategories$.next([
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

  loadFoods() {
    this._foods$.next(foods);
  }

  setGender(gender: Gender) {
    this._gender$.next(gender)
  }


  selectIngred(selectedIngred: Ingredient) {
    this.ingreds$.pipe(
      take(1),
      tap(ingreds => {
        this._ingreds$.next(ingreds.map(ingred => {
          if(ingred.id === selectedIngred.id){
            ingred.isSelected = !ingred.isSelected
          }
          return ingred
        }))

        this.updateSelectedCountInCategory()
      })
    ).subscribe()
  }

  selectCategory(selectedCategory: IngredientCategory) {
    this.ingredCategories$.pipe(
      take(1),
      tap(cats => {
        this._ingredCategories$.next(
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



  loadRecipes() {
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

        this._suggestedFoods$.next(suggestedFoods)
      })
    ).subscribe()
 }

 getTodos(){
  return this.http.get("https://jsonplaceholder.typicode.com/todos")
 }
}
