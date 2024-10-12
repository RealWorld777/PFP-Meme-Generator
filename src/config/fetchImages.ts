

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Buffer } from 'buffer';

export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
  const { folder } = req.query;
  const CLOUD_NAME = 'djfaylfi0';
  const API_KEY = '428744312113676';
  const API_SECRET = 'xsMD-nrD3DfqOhYfFtRFo0s2urc';
  const API_URL = `https://api.cloudinary.com/v1_1/djfaylfi0/resources/image`;

  try {
    const response = await axios.get(API_URL, {
      params: {
        type: 'upload',
        prefix: folder,
        max_results: 100,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')}`, // Basic Auth
      },
    });
    res.status(200).json(response.data.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}