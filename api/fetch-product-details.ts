// This file acts as a secure backend endpoint for fetching product details.
// It receives the request from the frontend, calls the Gemini service with Google Search,
// and returns the result, keeping the API key safe on the server.
import { fetchProductDetails as fetchProductDetailsWithGemini } from './lib/geminiService';

/**
 * Handles the API request for fetching product details.
 * This function is intended to be run in a server-side environment.
 * @param req The incoming request object. Expected to have a `body` property
 *            containing a JSON string with a `productName` key.
 * @param res The response object to send data back to the client.
 */
// In a real deployment (e.g., on Vercel or Netlify), this file would
// be treated as a serverless function. The function signature might
// vary slightly based on the platform, but the logic remains.
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { productName } = JSON.parse(req.body);

    if (!productName) {
      return res.status(400).json({ message: 'Missing "productName" in request body.' });
    }

    const details = await fetchProductDetailsWithGemini(productName);
    return res.status(200).json(details);

  } catch (error) {
    console.error('Error in /api/fetch-product-details:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return res.status(500).json({ message });
  }
}
