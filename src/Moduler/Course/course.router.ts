import express from 'express'
import auth from '../../middleware/auth'
import validationRequest from '../../middleware/validationRequest'
import { courseController } from './course.controller'
import { courseZodValidation } from './course.validation'


const router = express.Router()

router.post(
    '/courses',
    auth('admin'),
    validationRequest(courseZodValidation.TCoursevalidationSchema),
    courseController.createCourse
);

router.get('/courses', courseController.getCourse);

router.put(
    '/courses/:id',
    auth('admin'),
    validationRequest(courseZodValidation.TCourseupdatevalidationSchema),
    courseController.updateCourse
);
router.get('/courses/:id/reviews', courseController.getCourseReview)
router.get('/course/best', courseController.bestCourse)
export const courseRouter = router