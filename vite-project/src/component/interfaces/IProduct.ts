export interface IProduct {
  id?: string|undefined;
  title: string;
  description: string;
  imageURL: string;
  price: number;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IFormInput {
  id: string;
  name: string;
  label: string;
  type: string;
}