import { getRepository } from 'typeorm';

import Post from '../entities/Post';

interface Request {
  title: string;
  content: string;
}

export default class CreatePostService {
  async execute(data: Request): Promise<void> {
    const postsRepository = getRepository(Post);

    const post = postsRepository.create(data);

    await postsRepository.save(post);
  }
}
