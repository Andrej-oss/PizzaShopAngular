export interface Purchase {
  id?: number;
  name: string;
  description: string;
  price: number;
  userId: number;
  pizzaId?: number;
  drinkId?: number;
  snackId?: number;
  dessertId?: number;
  date?: any;
  amount?: number;
}
