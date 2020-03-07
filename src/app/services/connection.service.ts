import { Injectable } from '@angular/core';
import { Guardian } from '../models/Guardian';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  public GuardianList:Array<Guardian>=[];


}
