import { TestBed } from '@angular/core/testing';

import { AutoService } from './auto.service';

describe('AutoService', () => {
  let service: AutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

@Injectable({
  providedIn: 'root'
})

export class RiderService {
  private url = 'http://localhost:8080/rider'

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }
}
