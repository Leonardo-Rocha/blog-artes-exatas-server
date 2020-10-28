import { getRepository } from 'typeorm';

import Tag from '../entities/Tag';

export default class CreateTagService {
  async execute(name: string): Promise<Tag> {
    const tagsRepository = getRepository(Tag);

    const tag = tagsRepository.create({ name: name.toLowerCase() });

    await tagsRepository.save(tag);

    return tag;
  }
}
