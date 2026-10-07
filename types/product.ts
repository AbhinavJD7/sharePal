export interface IProduct {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag?: string;
  per_day_rent: number;
  out_of_stock: boolean;
  category?: string;
}

export interface IProductResponse {
  products: IProduct[];
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
  tag?: string;
}
