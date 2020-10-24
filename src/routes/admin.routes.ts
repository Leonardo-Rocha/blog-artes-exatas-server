import { Router } from 'express';
import CreatePostService from '../services/createPostService';

const adminRouter = Router();

adminRouter.post('/create-post', async (request, response) => {
  const { title, content } = request.body;

  const createPost = new CreatePostService();

  const post = await createPost.execute({
    title,
    content,
  });

  return response.json(post);
});

export default adminRouter;
