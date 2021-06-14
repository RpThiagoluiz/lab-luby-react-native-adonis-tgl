export interface BetApiResponse {
  id: number;
  user_id: number;
  game_id: number;
  numbers: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  game: {
    id: number;
    type: string;
    description: string;
    range: number;
    price: number;
    ["max-number"]: number;
    color: string;
    ["min-cart-value"]: number;
    created_at: Date;
    updated_at: Date;
  };
}
