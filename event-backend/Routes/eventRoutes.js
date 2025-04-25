
import express from 'express';

import {getAllEvents,getEventById,createEvent,updateEvent,deleteEvent} from '../Controllers/eventController.js';

import { isAuthenticate } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', getEventById);

router.post('/', isAuthenticate, createEvent);


router.put('/:id', isAuthenticate, updateEvent);

router.delete('/:id', isAuthenticate, deleteEvent);


export default router;