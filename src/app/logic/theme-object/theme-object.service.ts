import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Theme} from '../../components/models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeObjectService {
  data: BehaviorSubject<Theme> = new BehaviorSubject<Theme>({
    isDarkTheme: false,
    isAuthLoad: false,
    idChoose: 0,
    ingredients: [],
  });
  constructor() { }
}
