const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_BASE_URL = "https://api.pexels.com/v1";

export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
};

export type PexelsSearchResponse = {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
};

export type SearchOptions = {
  orientation?: "landscape" | "portrait" | "square";
  size?: "large" | "medium" | "small";
  color?: string;
  locale?: string;
  page?: number;
  per_page?: number;
};

/**
 * Search for photos on Pexels
 */
export async function searchPhotos(
  query: string,
  options: SearchOptions = {}
): Promise<PexelsSearchResponse> {
  if (!PEXELS_API_KEY) {
    throw new Error("PEXELS_API_KEY is not configured");
  }

  const params = new URLSearchParams({
    query,
    orientation: options.orientation || "landscape",
    size: options.size || "large",
    locale: options.locale || "en-US",
    page: String(options.page || 1),
    per_page: String(options.per_page || 15),
  });

  if (options.color) {
    params.append("color", options.color);
  }

  const response = await fetch(`${PEXELS_BASE_URL}/search?${params}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a specific photo by ID
 */
export async function getPhoto(id: number): Promise<PexelsPhoto> {
  if (!PEXELS_API_KEY) {
    throw new Error("PEXELS_API_KEY is not configured");
  }

  const response = await fetch(`${PEXELS_BASE_URL}/photos/${id}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get curated photos (editorial picks)
 */
export async function getCuratedPhotos(
  page = 1,
  perPage = 15
): Promise<PexelsSearchResponse> {
  if (!PEXELS_API_KEY) {
    throw new Error("PEXELS_API_KEY is not configured");
  }

  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  const response = await fetch(`${PEXELS_BASE_URL}/curated?${params}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Select a suitable photo from search results with some randomization
 * Picks from top results to ensure quality while adding variety
 */
export function selectPhotoFromResults(photos: PexelsPhoto[]): PexelsPhoto | null {
  if (photos.length === 0) {
    return null;
  }

  // Pick from top 5 results for quality, with some randomization
  const topPhotos = photos.slice(0, Math.min(5, photos.length));
  const randomIndex = Math.floor(Math.random() * topPhotos.length);
  return topPhotos[randomIndex];
}

/**
 * Fetch a photo suitable for a blog post
 * Tries multiple search terms if initial search fails
 */
export async function fetchBlogPhoto(
  searchTerms: string[]
): Promise<{
  photo: PexelsPhoto | null;
  searchTerm: string | null;
}> {
  for (const term of searchTerms) {
    try {
      const results = await searchPhotos(term, {
        orientation: "landscape",
        size: "large",
        per_page: 15,
      });

      const photo = selectPhotoFromResults(results.photos);
      if (photo) {
        return { photo, searchTerm: term };
      }
    } catch (error) {
      console.error(`Failed to search for "${term}":`, error);
      // Continue to next search term
    }
  }

  return { photo: null, searchTerm: null };
}
