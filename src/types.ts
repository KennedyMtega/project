export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
}