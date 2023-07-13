export interface Product {
  id: number | null;
  productName: string;
  productCode: string;
  price: number;
  description: string;
  imageUrl: string;
}

export function toProductNameUpperCase(value: Product | null) {
  return {
    ...value,
    productName: value?.productName.toLocaleUpperCase()
  };
}