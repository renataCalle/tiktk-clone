// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../utils/client';

export default async function handler( req: NextApiRequest,res: NextApiResponse) {
  
  if(req.method === 'POST') {
    // Sending the data to the request and getting it on the req.body object.
    const user = req.body;

    // Calling the Sanity client, creating a new user inside of Sanity's database.
    client.createIfNotExists(user)
    .then(() => res.status(200).json('Login successful!'));
  }
}
