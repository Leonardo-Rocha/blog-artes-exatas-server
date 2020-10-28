import { getRepository } from 'typeorm';

import Post from '../entities/Post';
import Tag from '../entities/Tag';
import CreateTagService from './createTagService';

export interface Request {
  title:                string;
  preview:              string;
  content:              string;
  readingTimeInMinutes: number;
  tags:                 string[];
  url:                  string;
}

export default class CreatePostService {
  async execute({ tags: rawTags, ...rest }: Request): Promise<Post> {
    const postsRepository = getRepository(Post);
    const tagsRepository = getRepository(Tag);
    const createTag = new CreateTagService();
    const tags: Tag[] = [];

    for(const rawTag of rawTags) {
      // TODO: optmize this to reduce the database requests
      let tag = await tagsRepository.findOne({ name: rawTag.toLowerCase() });
      if (!tag) {
        tag = await createTag.execute(rawTag);
      }
      tags.push(tag);
    }

    const post = postsRepository.create({ ...rest, tags });

    await postsRepository.save(post);

    return post;
  }
}
