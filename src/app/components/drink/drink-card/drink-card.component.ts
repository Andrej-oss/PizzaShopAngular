import {Component, Input, OnInit} from '@angular/core';
import {Drink} from '../../models/Drink';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {Router} from '@angular/router';
import {DrinkChooseSheetComponent} from '../drink-choose-sheet/drink-choose-sheet.component';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css']
})
export class DrinkCardComponent implements OnInit {
  @Input()
  drink: Drink;
  url = 'http://localhost:8080/drink/';
  constructor(private bottomSheet: MatBottomSheet,
              private router: Router,
              public themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
  }

  onChooseDrink(id: number): void{
    this.themeObjectService.data.value.idChooseDrink = id;
    this.bottomSheet.open(DrinkChooseSheetComponent);
  }
}
