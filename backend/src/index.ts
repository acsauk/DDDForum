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

function hasExpectedFields(userData: any) {
    return ('email' in userData && userData.email) &&
    ('username' in userData && userData.username) &&
    ('firstName' in userData && userData.firstName) &&
    ('lastName' in userData && userData.lastName)
}

app.post('/users/new', async (req: Request, res: Response) => {
    try {
        const userData = req.body

        // Validate
        const fieldsValid = hasExpectedFields(userData)
        if (!fieldsValid) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
        }

        const existingUserByEmail = await prisma.user.findFirst({ where: { email: userData.email } })
        if (existingUserByEmail) {
            return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
        }

        const existingUserByUsername = await prisma.user.findFirst({ where: { username: userData.username } })
        if (existingUserByUsername) {
            return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
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
    try {
        const userId = parseInt(req.params.userId)
        const user = await prisma.user.findFirst({ where: { id: userId } })

        if (!user) {
            return res.status(404).json({ error: Errors.UserNotFound, data: undefined, success: false })
        }

        const updatedUserData = req.body

        // Validate
        const fieldsValid = hasExpectedFields(updatedUserData)
        if (!fieldsValid) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
        }

        const existingUserByEmail = await prisma.user.findFirst({ where: { email: updatedUserData.email } })
        if (existingUserByEmail && user.id != existingUserByEmail.id) {
            return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
        }

        const existingUserByUsername = await prisma.user.findFirst({ where: { username: updatedUserData.username } })
        if (existingUserByUsername && user.id != existingUserByUsername.id) {
            return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedUserData
        })

        return res.status(201).json({
            error: undefined,
            data: parseUserForResponse(updatedUser),
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

app.get('/users', async (req: Request, res: Response) => {
    try {
        const hasEmail = 'email' in req.query
        if (!hasEmail) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
        }

        let email = req.query.email as string
        const user = await prisma.user.findFirst({ where: { email: email } })

        if (!user) {
            return res.status(404).json({ error: Errors.UserNotFound, data: undefined, success: false })
        }

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})