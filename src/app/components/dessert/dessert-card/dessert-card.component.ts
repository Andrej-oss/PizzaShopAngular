import {Component, Input, OnInit} from '@angular/core';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {Dessert} from '../../models/Dessert';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Router} from '@angular/router';
import {DrinkChooseSheetComponent} from '../../drink/drink-choose-sheet/drink-choose-sheet.component';
import {DessertChooseSheetComponent} from '../dessert-choose-sheet/dessert-choose-sheet.component';

@Component({
  selector: 'app-dessert-card',
  templateUrl: './dessert-card.component.html',
  styleUrls: ['./dessert-card.component.css']
})
export class DessertCardComponent implements OnInit {
  @Input()
  dessert: Dessert;
  url = 'http://localhost:8080/dessert/';
  constructor(private bottomSheet: MatBottomSheet,
              private router: Router,
              public themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
  }

  onChooseDrink(id: number): void{
    this.themeObjectService.data.value.idChooseDessert = id;
    this.bottomSheet.open(DessertChooseSheetComponent);
  }
}
