export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  description: string;
  price: number;
  photo: string;
}

export type Catalog = { [id: string]: Product };
