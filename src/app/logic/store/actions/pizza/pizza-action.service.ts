import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  CommentDeleteInState, CommentUpdateInState,
  IngredientsLoad, PizzaCommentSaveLoad, PizzaCommentsLoad, PizzaDeleteLoaded, PizzaSaveLoaded,
  PizzasLoad, RatingLoad,
  SizePizzaLoad
} from '../../actions-type/pizzaAction';
import {IngredientGetService} from '../../../services/get.services/ingredient/ingredient.get.service';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';
import {Rating} from '../../../../components/models/Rating';
import {RatingService} from '../../../services/post.service/rating/rating.service';
import {Comment} from '../../../../components/models/Comment';
import {CommentService} from '../../../services/commentDao/comment.service';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {SizeService} from '../../../services/get.services/size/size.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaActionService {

  constructor(private pizzaService: PizzaService,
              private ingredientGetService: IngredientGetService,
              private sizeService: SizeService,
              private themeService: ThemeObjectService,
              private ratingService: RatingService,
              private commentService: CommentService,
              private store: Store) { }
  getAllPizzas(): | {}{
    return this.pizzaService.getAllPizza()
      .subscribe(data => {
        this.store.dispatch(new PizzasLoad(data));
      });
  }
  updatePizza(id: number, formData: FormData, append: void): |{}{
    return this.pizzaService.upDatePizza(id, formData, append)
      .subscribe(data => this.store.dispatch(new PizzaSaveLoaded(data)));
  }
  deletePizza(id: number): | {}{
    return this.pizzaService.deletePizza(id)
      .subscribe(data => this.store.dispatch(new PizzaDeleteLoaded(data)));
  }
  getIngredients(): | {}{
    return this.ingredientGetService.getAllIngredients()
      .subscribe(data => {
        this.store.dispatch(new IngredientsLoad(data));
      });
  }
  getSizePizza(id: number, name: string): | {}{
    return this.sizeService.getPizzaSize(id, name)
      .subscribe(data => {
        this.themeService.data.value.price = data.price;
        this.store.dispatch(new SizePizzaLoad(data));
      });
  }
  postRating(pizzaId: number, rating: Rating): | {}{
    return this.ratingService.saveRating(rating, pizzaId).subscribe(data => {
      this.store.dispatch(new RatingLoad(data));
    });
  }
  postComment(pizzaId: number, userId: number, comment: Comment): | {}{
    return this.commentService.saveComment(pizzaId, userId, comment)
      .subscribe(data => this.store.dispatch(new PizzaCommentSaveLoad(data)));
  }
  getPizzaComments(pizzaId: number): | {}{
    return this.commentService.getComments(pizzaId)
      .subscribe(data => this.store.dispatch(new PizzaCommentsLoad(data)));
  }
  deleteCommentPizza(id: number): void{
    this.store.dispatch(new CommentDeleteInState({id}));
  }
  updateComment(id: number, comment: Comment): void{
    comment.id = id;
    this.store.dispatch(new CommentUpdateInState({id, comment}));
  }
}