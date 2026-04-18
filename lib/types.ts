export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl?: string;
  medium: string;
  dimensions: string;
  year: number;
  price?: number | null;
  description?: string;
  category?: string;
  available?: boolean;
}

export interface ArtistInfo {
  name: string;
  title: string;
  bio: string;
  statement: string;
  email: string;
  phone?: string;
  location: string;
  profileImage?: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'commission' | 'exhibition' | 'inquiry' | 'other';
  message: string;
}

export interface ArtworkArchiveResponse {
  id: string;
  title: string;
  thumbnail: string;
  image: string;
  medium?: string;
  dimensions?: string;
  created?: string;
  price?: string;
  description?: string;
}
