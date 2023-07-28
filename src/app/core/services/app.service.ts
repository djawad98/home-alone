import { Injectable } from "@angular/core";
import { Gender } from "../models/gender";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _gender$ = new BehaviorSubject<Gender | null>(null);
    gender$ = this._gender$.asObservable();

    setGender(gender: Gender){
        this._gender$.next(gender)
    }
}