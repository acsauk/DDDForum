import express, { Request, Response } from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.post('/users/new', async (req: Request, res: Response) => {
    //
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