import {Component, Input, OnInit} from '@angular/core';
import {Snack} from '../../models/Snack';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {SnackChooseSheetComponent} from '../snack-choose-sheet/snack-choose-sheet.component';

@Component({
  selector: 'app-snack-card',
  templateUrl: './snack-card.component.html',
  styleUrls: ['./snack-card.component.css']
})
export class SnackCardComponent implements OnInit {
  @Input()
  snack: Snack;
  url = 'http://localhost:8080/snack/';
  constructor(public themeObjectService: ThemeObjectService, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  onChooseSnack(id: number): void{
    this.themeObjectService.data.value.idChooseSnack = id;
    this.bottomSheet.open(SnackChooseSheetComponent);
  }
}
