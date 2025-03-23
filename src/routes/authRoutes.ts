import { NextFunction, Request, Response, Router } from 'express';
import { loginUser } from '../controllers/authController';
import { requestLogger } from '../middleware/loggingMiddleware';

const router = Router();

router.route('/login')
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Logs in a user
     *     tags: 
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successful login
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   type: object
     *                   properties:
     *                     token:
     *                       type: string
     *                     expiresIn:
     *                       type: number
     *       400:
     *         description: Bad request - Invalid input data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    .post(requestLogger, loginUser);

export default router;
