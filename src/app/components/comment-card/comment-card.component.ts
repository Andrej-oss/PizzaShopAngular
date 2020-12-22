import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../models/Comment';
import {PizzaService} from '../../logic/store/actions/pizza/pizza.service';
import {CommentDeleteService} from '../../logic/services/delete.services/comment/comment-delete.service';
import {ThemeObjectService} from '../../logic/theme-object/theme-object.service';
import {Voice} from '../models/Voice';
import {VoicePostService} from '../../logic/services/post.service/voice/voice.post.service';
import {VoiceService} from '../../logic/services/delete.services/voice/voice.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {
  @Input()
  comment: Comment;
  @Input()
  pizzaId;
  isEditComment: boolean;
  voice: Voice;
  isLiked: boolean;
  voiceSum: number;

  constructor(private pizzaService: PizzaService,
              private commentDeleteService: CommentDeleteService,
              private voiceDeleteService: VoiceService,
              private voicePostService: VoicePostService,
              public themeObjectService: ThemeObjectService) {
  }

  ngOnInit(): void {
    this.voiceSummary();
    this.checkIsUserVoted();
  }

  onDeleteComment(id: number): void {
    debugger;
    this.commentDeleteService.deleteComment(id).subscribe(data => console.log(data));
    this.pizzaService.deleteCommentPizza(id);
  }

  onEdit(id: number): void {
    this.isEditComment = !this.isEditComment;
  }

  onLikeComment(id: number): void {
    this.voice = {
      voice: 1,
      userId: this.themeObjectService.data.value.userId
    };
    this.voicePostService.saveVoice(id, this.voice).subscribe(data => {
      console.log(data);
    });
    this.isLiked = true;
    this.voiceSum += 1;
  }
  voiceSummary(): void{
    debugger;
    this.voiceSum = this.comment.voice.reduce((previousValue, currentValue) => previousValue + currentValue.voice, 0);
  }
  checkIsUserVoted(): void{
    const user = this.comment.voice.find(value => value.userId === this.themeObjectService.data.value.userId);
    console.log(user);
    user && user.userId !== 0 ? this.isLiked = true : this.isLiked = false;
  }
  onDeleteVoice(id: number): void{
    this.voiceDeleteService.deleteVoiceComment(id).subscribe(data => console.log(data));
    this.voiceSum -= 1;
    this.isLiked = false;
  }
}
