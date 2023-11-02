import { Pipe, PipeTransform } from "@angular/core";
import { Gender } from "../models/gender";

@Pipe({
    name: 'gender'
})

export class GenderPipe implements PipeTransform {
    transform(gender: Gender | null){
        switch (gender){
            case Gender.Male:
                return 'حاجی'
            case Gender.Female:
                return 'آبجی'
            default:
                return ''
        }
    }
}
