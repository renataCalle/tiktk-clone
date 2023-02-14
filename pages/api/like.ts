// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../utils/client';
import {uuid} from 'uuidv4';  //unique identifier for each like

export default async function handler( req: NextApiRequest,res: NextApiResponse) {
  
  if(req.method === 'PUT') {
    const {userId, postId, like} = req.body;

    const data = 
    //if like is true, then add like to post
    like ? await client
    .patch(postId) //Change the postId in the client
    .setIfMissing({likes:[]}) //Set the likes array to an empty array

    .insert('after', 'likes[-1]', [  //Insert at the end of the likes array
      {
        _key: uuid(),
        _ref: userId,
      }
    ])
    .commit() //Saves the changes to the database
    // else
    : await client
    .patch(postId) //Change the postId in the client
    .unset([`likes[_ref=="${userId}"]`]) //Remove the postId from the likes array
    .commit(); //Saves the changes to the database
    res.status(200).json(data); //returns the updated post
  }
}
