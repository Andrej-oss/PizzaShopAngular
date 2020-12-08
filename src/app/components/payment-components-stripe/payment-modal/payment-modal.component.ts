import {Component, Input, OnInit} from '@angular/core';
import {PaymentService} from '../../../logic/services/post.service/payment/payment.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Purchase} from "../../models/Purchase";
import {ThemeObjectService} from "../../../logic/theme-object/theme-object.service";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
  @Input() id;
  @Input() tittle;
  @Input() description;
  @Input() price;
  @Input() pizzaId;
  purchase: Purchase;

  constructor(private paymentService: PaymentService,
              private toastrService: ToastrService,
              public activeModal: NgbActiveModal,
              private themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
    debugger;
  }
  confirm(id: string): void {
    this.purchase =  {
      ingredients: this.description,
      name: this.tittle,
      pizzaId: this.pizzaId,
      price: this.price,
      userId: this.themeObjectService.data.value.userId
    };
    this.paymentService.confirm(id, this.purchase).subscribe(
      data => {
        this.toastrService.success
        ('!!!!!!!!!!!!', '!!!!!!!!!!!! ' + data[`id`], {positionClass: 'toast-top-center', timeOut: 3000});
        this.activeModal.close();
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }

  cancel(id: string): void {
    this.paymentService.cancel(id).subscribe(
      data => {
        this.toastrService.show
        ('pago cancelado', 'se ha cancelado el pago con id ' + data[`id`], {positionClass: 'toast-top-center', timeOut: 3000});
        this.activeModal.close();
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }
}
