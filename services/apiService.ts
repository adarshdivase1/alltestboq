import { Boq, ProductDetails } from '../types';

/**
 * A helper function to handle fetch requests to our backend API and parse errors.
 * @param url - The API endpoint URL (e.g., '/api/generate-boq').
 * @param options - The standard `fetch` options object.
 * @returns A promise that resolves to the JSON response from the backend.
 */
async function apiFetch(url: string, options: RequestInit) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    // Try to parse the error message from the backend, otherwise throw a generic error.
    const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
    throw new Error(errorData.message || 'Failed to fetch from the API.');
  }

  return response.json();
}

/**
 * Generates a Bill of Quantities (BOQ) by calling the backend API endpoint.
 * @param requirements - A string describing the project and room requirements.
 * @returns A promise that resolves to a BOQ object.
 */
export async function generateBoq(requirements: string): Promise<Boq> {
  // This now securely calls our backend endpoint, not Gemini directly.
  return apiFetch('/api/generate-boq', {
    method: 'POST',
    body: JSON.stringify({ requirements }),
  });
}

/**
 * Refines an existing Bill of Quantities (BOQ) by calling the backend API endpoint.
 * @param currentBoq - The current BOQ object to be refined.
 * @param refinementPrompt - A string describing the desired changes to the BOQ.
 * @returns A promise that resolves to the refined BOQ object.
 */
export async function refineBoq(currentBoq: Boq, refinementPrompt: string): Promise<Boq> {
  // This now securely calls our backend endpoint.
  return apiFetch('/api/refine-boq', {
    method: 'POST',
    body: JSON.stringify({ currentBoq, refinementPrompt }),
  });
}

/**
 * Fetches product details by calling the backend API endpoint.
 * @param productName - The name of the product to search for.
 * @returns A promise that resolves to the product details.
 */
export async function fetchProductDetails(productName: string): Promise<ProductDetails> {
  // This now securely calls our backend endpoint.
  return apiFetch('/api/fetch-product-details', {
    method: 'POST',
    body: JSON.stringify({ productName }),
  });
}
