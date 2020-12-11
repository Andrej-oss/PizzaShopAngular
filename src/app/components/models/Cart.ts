export interface Cart {
  id?: number;
  description: string;
  pizzaId: number;
  price: number;
  amount: number;
  userId?: number;
  size: string;
}
