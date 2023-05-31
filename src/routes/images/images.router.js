import { Router } from 'express';
import { handleImagesPut, handleImagesPost } from './images.controller.js';

const imagesRouter = new Router();

imagesRouter.put('/', handleImagesPut);
imagesRouter.post('/', handleImagesPost);

export default imagesRouter;
