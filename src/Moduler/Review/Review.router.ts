import express from 'express'
import auth from '../../middleware/auth'
import validationRequest from '../../middleware/validationRequest'
import { reviewController } from './Review.controller'
import reviewValidationSchema from './Review.validation'

const router = express.Router()

router.post(
    '/',
    auth('user'),
    validationRequest(reviewValidationSchema),
    reviewController.createReview)

export const reviewRouter = router