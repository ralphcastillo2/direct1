import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getAllCities } from '@/lib/cities';
import { getAllCategories } from '@/lib/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Connect to the database
    const connection = await connectToDatabase();
    
    if (!connection) {
      throw new Error('Database connection failed');
    }

    // Get all cities and categories
    const cities = await getAllCities();
    const categories = await getAllCategories();

    // Base URLs
    const baseUrls = [
      {
        url: 'https://weddingdirectoryfl.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://weddingdirectoryfl.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryfl.com/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryfl.com/categories',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];

    // City URLs
    const cityUrls = cities.map((city) => ({
      url: `https://weddingdirectoryfl.com/city/${encodeURIComponent(city.name.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    // Category URLs
    const categoryUrls = categories.map((category) => ({
      url: `https://weddingdirectoryfl.com/category/${encodeURIComponent(category.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    // Combine all URLs
    return [...baseUrls, ...cityUrls, ...categoryUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return at least the static URLs if there's an error
    return [
      {
        url: 'https://weddingdirectoryfl.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://weddingdirectoryfl.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryfl.com/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryfl.com/categories',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];
  }
} 