import { Size } from './Size';
import {Rating} from './Rating';
import {Comment} from './Comment';

export interface Pizza {
  id?: number;
  new: boolean;
  name: string;
  description: string;
  price: number;
  path: string;
  ingredients: string;
  sizes: Size[];
  rating: Rating;
  comments: Comment[];
}
