import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { courseController } from './course.controller'
import { courseZodValidation } from './course.validation'


const router = express.Router()

router.post('/course', validationRequest(courseZodValidation.TCoursevalidationSchema), courseController.createCourse);
router.get('/courses', courseController.getCourse);
router.put('/courses/:id', validationRequest(courseZodValidation.TCourseupdatevalidationSchema), courseController.updateCourse);
router.get('/courses/:id/reviews', courseController.getCourseReview)
router.get('/course/best', courseController.bestCourse)
export const courseRouter = router