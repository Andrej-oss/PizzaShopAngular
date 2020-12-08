import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DefaultPizzaState} from '../../../components/models/InitialPIzzaState';
import {pizzaNode} from '../redusers/pizzaReducer';

export const PizzaSelector = createFeatureSelector<DefaultPizzaState>(pizzaNode);

export const AllPizzasSelector = createSelector(PizzaSelector, data => data.pizzas);
export const IngredientsSelector = createSelector(PizzaSelector, data => data.ingredients);
export const SizePizzaSelector = createSelector(PizzaSelector, data => data.size);