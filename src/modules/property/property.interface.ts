import { Availability } from "../../../generated/prisma/enums";

export interface IProperty {
  title: string;
  description: string;
  location: string;
  address: string;
  rent: number;
  bedrooms: number;
  availability: Availability;
  bathrooms: number;
  size?: number;
  amenities: string[];
  images: string[];
  categoryId: string;
}