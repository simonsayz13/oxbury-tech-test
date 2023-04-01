export type Application = {
  id: number;
  type: string;
  amount_requested: number;
  status: string;
  product_id: number;
  farmer_id: number;
};

export type Farmer = {
  id: number;
  name: string;
  age: number;
  phone_number: string;
  farm_id: number;
};

export type Farm = {
  id: number;
  name: string;
  num_cows: number;
  num_chickens: number;
  num_pigs: number;
  acres_farmed: number;
};

export type Product = {
  id: number;
  type: string;
  name: string;
};

export type RowCount = {
  count: number;
};
