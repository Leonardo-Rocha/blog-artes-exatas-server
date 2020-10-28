import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';

import Post from '../entities/Post';
import Tag from '../entities/Tag';

const postsRouter = Router();

postsRouter.get('/', async (request, response) => {
  const { tag } = request.query;

  const postsRepository = getRepository(Post);
  // TODO: query using the tags and search in title and content
  // const tagsRepository = getRepository(Tag);

  // if (tag) {

  // }

  // get all posts without the content
  const posts = await postsRepository.find(
    {
      relations: ['tags'],
      select: ['id', 'title', 'preview', 'readingTimeInMinutes', 'url',
      'createdAt', 'updatedAt'],
    }
  );

  return response.json(posts);
});

postsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const postsRepository = getRepository(Post);

  const post = await postsRepository.findOne(id, { relations: ['tags'] });

  return response.json(post);
});

export default postsRouter;
