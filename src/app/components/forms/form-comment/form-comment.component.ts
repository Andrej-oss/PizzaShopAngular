import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PizzaService} from '../../../logic/store/actions/pizza/pizza.service';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {Comment} from '../../models/Comment';
import {CommentService} from "../../../logic/services/post.service/comment/comment.service";

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.css']
})
export class FormCommentComponent implements OnInit {
  @Input()
  pizzaId;
  @Input()
  commentUser: Comment;
  pizzaComment: Comment;
  comment: FormGroup;
  tittle: FormControl;
  body: FormControl = new FormControl('', [Validators.required]);
  constructor(private pizzaService: PizzaService,
              private commentService: CommentService,
              private themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
    this.comment = new FormGroup({
      tittle: this.tittle = new FormControl(this.commentUser ? this.commentUser.tittle : '', [Validators.required]),
      body: this.body = new FormControl(this.commentUser ? this.commentUser.body : '', [Validators.required])
    });
  }

  onSave(comment: FormGroup): void{
    this.pizzaComment = {
      tittle: comment.controls.tittle.value,
      body: comment.controls.body.value,
    };
    this.pizzaService.postComment(this.pizzaId, this.themeObjectService.data.value.userId, this.pizzaComment);
  }

  onUpdate(comment: FormGroup): void{
    this.pizzaComment = {
      author: this.commentUser.author,
      tittle: comment.controls.tittle.value,
      body: comment.controls.body.value,
      pizzaId: this.pizzaId,
      userId: this.themeObjectService.data.value.userId,
    };
    debugger;
    this.commentService.editComment(this.commentUser.id, this.pizzaComment)
      .subscribe(data => console.log(data));
    this.pizzaService.updateComment(this.commentUser.id, this.pizzaComment);
  }
}
