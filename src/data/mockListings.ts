// src/data/mockListings.ts
export type Property = {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  lat: number;
  lng: number;
  image: string;
  address: string;
}

export const mockListings: Property[] = [
  {
    id: "p1",
    title: "Modern Condo in Downtown Toronto",
    price: 680000,
    bedrooms: 2,
    lat: 43.6453,
    lng: -79.3806,
    image: "https://via.placeholder.com/150",
    address: "123 King St W, Toronto, ON",
  },
  {
    id: "p2",
    title: "Spacious Townhouse in North York",
    price: 720000,
    bedrooms: 3,
    lat: 43.7615,
    lng: -79.4111,
    image: "https://via.placeholder.com/150",
    address: "456 Sheppard Ave E, North York, ON",
  },
  {
    id: "p3",
    title: "1-Bedroom Condo in Liberty Village",
    price: 599000,
    bedrooms: 1,
    lat: 43.6372,
    lng: -79.4229,
    image: "https://via.placeholder.com/150",
    address: "789 Liberty St, Toronto, ON",
  },
];
