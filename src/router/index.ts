import express from 'express'
import { categoryRouter } from '../Moduler/Category/Category.router'
import { courseRouter } from '../Moduler/Course/course.router'
import { reviewRouter } from '../Moduler/Review/Review.router'
import { authRouter } from '../Moduler/user/user.router'

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
        path: '/reviews',
        router: reviewRouter
    },
    {
        path: '/auth',
        router: authRouter
    },
]
moduleRouters.map(route => router.use(route.path, route.router))

export default router