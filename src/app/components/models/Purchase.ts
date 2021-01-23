export interface Purchase {
  id?: number;
  name: string;
  description: string;
  price: number;
  userId: number;
  pizzaId?: number;
  drinkId?: number;
  date?: any;
  amount?: number;
}
