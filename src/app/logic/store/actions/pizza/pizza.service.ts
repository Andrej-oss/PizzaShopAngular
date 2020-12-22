import { Injectable } from '@angular/core';
import {PizzaGetService} from '../../../services/get.services/pizza/pizza.get.service';
import {Store} from '@ngrx/store';
import {
  CommentDeleteInState, CommentUpdateInState,
  IngredientsLoad, PizzaCommentSaveLoad, PizzaCommentsLoad,
  PizzasLoad, RatingLoad,
  SizePizzaLoad
} from '../../actions-type/pizzaAction';
import {IngredientGetService} from '../../../services/get.services/ingredient/ingredient.get.service';
import {SizeService} from '../../../services/get.services/size/size.service';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';
import {Rating} from '../../../../components/models/Rating';
import {RatingService} from '../../../services/post.service/rating/rating.service';
import {CommentService} from '../../../services/post.service/comment/comment.service';
import {Comment} from '../../../../components/models/Comment';
import {CommentGetService} from '../../../services/get.services/comment/comment.get.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private pizzaGetService: PizzaGetService,
              private ingredientGetService: IngredientGetService,
              private sizeService: SizeService,
              private themeService: ThemeObjectService,
              private ratingService: RatingService,
              private commentService: CommentService,
              private commentGetService: CommentGetService,
              private store: Store) { }
  getAllPizzas(): | {}{
    return this.pizzaGetService.getAllPizza()
      .subscribe(data => {
        this.store.dispatch(new PizzasLoad(data));
      });
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
    return this.commentGetService.getComments(pizzaId)
      .subscribe(data => this.store.dispatch(new PizzaCommentsLoad(data)));
  }
  deleteCommentPizza(id: number): void{
    debugger;
    this.store.dispatch(new CommentDeleteInState({id}));
  }
  updateComment(id: number, comment: Comment): void{
    comment.id = id;
    this.store.dispatch(new CommentUpdateInState({id, comment}));
  }
}
