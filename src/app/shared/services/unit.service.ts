import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private apiService: WebRequestService) { }

  addUnit(unit: any) {
    return this.apiService.saveUnit(unit);
  }

  getUnit(id: number) {
    return this.apiService.getUnit(id);
  }

  putUnit(id: number, unit: any) {
    return this.apiService.putUnit(id, unit);
  }

  deleteUnit(id: number) {
    return this.apiService.deleteUnit(id);
  }

  getAll() {
    return this.apiService.getAllUnits();
  }
}
