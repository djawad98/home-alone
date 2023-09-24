import { firstValueFrom, of } from "rxjs";
import { AppService } from "../src/app/core/services/app.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

test('getTodos works!', () => {
    const mocked = [{id: 12, label: '123123'}]

    TestBed.configureTestingModule({
        imports: [HttpClientModule]
    })
    const http = TestBed.inject(HttpClient);
    jest.spyOn(http, 'get').mockImplementationOnce(() => {
        return of(mocked)
    })
    const appService = TestBed.inject(AppService)

    return firstValueFrom(appService.getTodos()).then(data => {
        expect(data).toBe(mocked)
    })
})