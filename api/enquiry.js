/**
 * Vercel serverless function: POST /api/enquiry
 * All logic lives in server/enquiry-core.js so it can be tested and run locally.
 */
import { handleEnquiryRequest } from '../server/enquiry-core.js';

export default function handler(req, res) {
  return handleEnquiryRequest(req, res);
}
