import express from 'express'
import { categoryRouter } from '../Moduler/Category/Category.router'
import { courseRouter } from '../Moduler/Course/course.router'
import { reviewRouter } from '../Moduler/Review/Review.router'

const router = express.Router()
const moduleRouters = [
    {
        path: '/',
        router: courseRouter
    },
    {
        path: '/categories',
        router: categoryRouter
    },
    {
        path: '/review',
        router: reviewRouter
    }
]
moduleRouters.map(route => router.use(route.path, route.router))

export default router