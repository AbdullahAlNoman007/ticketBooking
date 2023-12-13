import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { reviewController } from './Review.controller'
import reviewValidationSchema from './Review.validation'

const router = express.Router()

router.post('/', validationRequest(reviewValidationSchema), reviewController.createReview)

export const reviewRouter = router