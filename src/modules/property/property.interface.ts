export interface IProperty {
  title: string;
  description: string;
  location: string;
  address: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  amenities: string[];
  images: string[];
  categoryId: string;
}