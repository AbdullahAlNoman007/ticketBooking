import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { categoryController } from './Category.controller'
import CategoryValidationSchema from './Category.validation'

const router = express.Router()

router.post('/', validationRequest(CategoryValidationSchema), categoryController.createCategory)
router.get('/', categoryController.getCategory)

export const categoryRouter = router