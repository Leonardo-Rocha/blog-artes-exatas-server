import { Router } from 'express';
import CreatePostService from '../services/createPostService';

const adminRouter = Router();

adminRouter.post('/create-post', async (request, response) => {
  const {
    title,
    preview,
    content,
    readingTimeInMinutes,
    tags,
    url
  } = request.body;

  const createPost = new CreatePostService();

  const post = await createPost.execute({
    title,
    preview,
    content,
    readingTimeInMinutes,
    tags,
    url,
  });

  return response.json(post);
});

export default adminRouter;
