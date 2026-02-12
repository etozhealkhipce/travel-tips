export type PlaceCategory = 'food' | 'sights' | 'museums' | 'hotels' | 'shopping' | 'nightlife';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  rating: number;
  description: string;
  distance: string;
  hours: string;
  imageUrl: string;
}

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: 'The Grand Museum',
    category: 'museums',
    lat: 51.5194,
    lng: -0.1270,
    rating: 4.9,
    description: 'Historic site featuring national treasures and world-class exhibitions',
    distance: '0.5 miles away',
    hours: 'Open until 8 PM',
    imageUrl: 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Bistro 22',
    category: 'food',
    lat: 51.5074,
    lng: -0.1278,
    rating: 4.5,
    description: 'Cozy French bistro with seasonal menu and excellent wine selection',
    distance: '0.3 miles away',
    hours: 'Open until 11 PM',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'History Hall',
    category: 'museums',
    lat: 51.5314,
    lng: -0.1260,
    rating: 4.7,
    description: 'Explore centuries of fascinating history through interactive exhibits',
    distance: '0.8 miles away',
    hours: 'Open until 6 PM',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'The View Point',
    category: 'sights',
    lat: 51.5033,
    lng: -0.1195,
    rating: 4.8,
    description: 'Panoramic views of the city skyline from the observation deck',
    distance: '1.2 miles away',
    hours: 'Open until 10 PM',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Camden Market',
    category: 'shopping',
    lat: 51.5412,
    lng: -0.1459,
    rating: 4.6,
    description: 'Vibrant market with unique crafts, vintage finds, and street food',
    distance: '2.1 miles away',
    hours: 'Open until 7 PM',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Tower Bridge',
    category: 'sights',
    lat: 51.5055,
    lng: -0.0754,
    rating: 4.9,
    description: 'Iconic Victorian bridge with glass walkways and stunning river views',
    distance: '1.5 miles away',
    hours: 'Open until 9 PM',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
  },
  {
    id: '7',
    name: 'The Ritz Hotel',
    category: 'hotels',
    lat: 51.5074,
    lng: -0.1419,
    rating: 4.8,
    description: 'Luxury 5-star hotel with elegant rooms and world-class service',
    distance: '0.6 miles away',
    hours: 'Open 24 hours',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  },
  {
    id: '8',
    name: 'Jazz Club London',
    category: 'nightlife',
    lat: 51.5145,
    lng: -0.1447,
    rating: 4.4,
    description: 'Intimate jazz venue featuring live performances and craft cocktails',
    distance: '0.9 miles away',
    hours: 'Open until 2 AM',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
  },
];

export const CATEGORIES = [
  { id: 'food', label: 'Food', icon: 'utensils' },
  { id: 'sights', label: 'Sights', icon: 'camera' },
  { id: 'museums', label: 'Museums', icon: 'building-2' },
  { id: 'hotels', label: 'Hotels', icon: 'bed' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-bag' },
  { id: 'nightlife', label: 'Nightlife', icon: 'music' },
] as const;
