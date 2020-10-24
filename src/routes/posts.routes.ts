import { Router } from 'express';
import { getRepository } from 'typeorm';

import Post from '../entities/Post';

const postsRouter = Router();

postsRouter.get('/', async (request, response) => {
  const postsRepository = getRepository(Post);

  const posts = await postsRepository.find();

  return response.json(posts);
});

postsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const postsRepository = getRepository(Post);

  const post = await postsRepository.findOne(id);

  return response.json(post);
});

export default postsRouter;
