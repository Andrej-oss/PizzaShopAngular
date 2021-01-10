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
    price: 0,
    userName: '',
    userId: 0,
    message: '',
    sizeCart: 0,
    totalPrice: 0,
    isOpenPayment: false,
    lastPage: 0,
    firstPage: 0,
  });
  constructor() { }
}
