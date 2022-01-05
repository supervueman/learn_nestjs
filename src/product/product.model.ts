export class ProductModel {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  crdit: number;
  calculatedRating: number;
  description: string;
  advantages: string;
  disAdvantages: string;
  categories: string[];
  tags: string;
  characteristics: {
    [key: string]: string;
  };
}
