import express, { Request, Response } from 'express'
import { prisma } from './database'
import cors from 'cors'
import { User } from '@prisma/client'

const Errors = {
    UsernameAlreadyTaken: 'UserNameAlreadyTaken',
    EmailAlreadyInUse: 'EmailAlreadyInUse',
    ValidationError: 'ValidationError',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    UserNotFound: 'UserNotFound'
}

const app = express()
app.use(express.json())
app.use(cors())

function generateRandomPassword(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const passwordArray = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        passwordArray.push(charset[randomIndex]);
    }

    return passwordArray.join('');
}

  function parseUserForResponse (user: User) {
    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;
    return returnData;
  }

app.post('/users/new', async (req: Request, res: Response) => {
    try {
        const userData = req.body

        const existingUserByEmail = await prisma.user.findFirst({ where: { email: req.body.email } })
        if (existingUserByEmail) {
            return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
        }

        const user = await prisma.user.create({
            data: { ...userData, password: generateRandomPassword(10)}
        })

        return res.status(201).json({
            error: undefined,
            data: parseUserForResponse(user),
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            error: Errors.ServerError,
            data: undefined,
            success: false
        })
    }
})

app.post('/users/edit/:userId', async (req: Request, res: Response) => {
    //
})

app.get('/users', async (req: Request, res: Response) => {
    //
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})