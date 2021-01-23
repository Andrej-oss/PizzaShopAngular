export interface Cart {
  id?: number;
  description: string;
  pizzaId?: number;
  drinkId?: number;
  price: number;
  amount: number;
  userId?: number;
  size?: string;
  volume?: number;
}
