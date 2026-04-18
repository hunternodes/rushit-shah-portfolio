import axios, { AxiosInstance } from 'axios';
import { Artwork, ArtworkArchiveResponse } from '../types';

class ArtworkArchiveAPI {
  private client: AxiosInstance;
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_ARTWORK_ARCHIVE_URL || 'https://www.artworkarchive.com/api/v1';
    const apiKey = process.env.ARTWORK_ARCHIVE_API_KEY || '';

    this.baseUrl = baseUrl;
    this.apiKey = apiKey;

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  /**
   * Fetch all artworks from ArtworkArchive
   */
  async fetchAllArtworks(): Promise<Artwork[]> {
    try {
      const response = await this.client.get('/artworks', {
        params: {
          limit: 100,
          published: true,
        },
      });

      return this.transformArtworks(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching artworks from ArtworkArchive:', error);
      return [];
    }
  }

  /**
   * Fetch a single artwork by ID
   */
  async fetchArtworkById(id: string): Promise<Artwork | null> {
    try {
      const response = await this.client.get(`/artworks/${id}`);
      const artwork = this.transformArtwork(response.data.data || response.data);
      return artwork;
    } catch (error) {
      console.error(`Error fetching artwork ${id}:`, error);
      return null;
    }
  }

  /**
   * Fetch artworks by category
   */
  async fetchArtworksByCategory(category: string): Promise<Artwork[]> {
    try {
      const response = await this.client.get('/artworks', {
        params: {
          category,
          limit: 100,
          published: true,
        },
      });

      return this.transformArtworks(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching artworks by category:', error);
      return [];
    }
  }

  /**
   * Transform ArtworkArchive response to Artwork interface
   */
  private transformArtwork(data: ArtworkArchiveResponse): Artwork {
    const year = data.created ? new Date(data.created).getFullYear() : new Date().getFullYear();

    return {
      id: data.id || '',
      title: data.title || 'Untitled',
      imageUrl: data.image || data.thumbnail || '',
      thumbnailUrl: data.thumbnail || data.image || '',
      medium: data.medium || 'Mixed Media',
      dimensions: data.dimensions || 'Dimensions not specified',
      year,
      price: data.price ? parseFloat(data.price) : undefined,
      description: data.description || '',
      available: true,
    };
  }

  /**
   * Transform multiple artworks
   */
  private transformArtworks(data: ArtworkArchiveResponse[]): Artwork[] {
    return data.map((item) => this.transformArtwork(item));
  }
}

// Singleton instance
let apiInstance: ArtworkArchiveAPI | null = null;

export function getArtworkArchiveAPI(): ArtworkArchiveAPI {
  if (!apiInstance) {
    apiInstance = new ArtworkArchiveAPI();
  }
  return apiInstance;
}

// Export for direct use
export default new ArtworkArchiveAPI();
