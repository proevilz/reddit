import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username } = req.body

    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }
    if (!email || !email.length || !username || !username.length) {
        res.status(400).end('Invalid payload')
        return
    }
    try {
        await prisma.$connect()
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (userExists) {
            await prisma.$disconnect()
            res.status(422).end('User already exists with that email address.')
            return
        }
        await prisma.user.create({
            data: {
                email,
                username,
            },
        })
        await prisma.$disconnect()
        res.status(201).end()
    } catch (error) {
        await prisma.$disconnect()
        console.error('Failed to create prisma user', error)
        res.status(500).end()
    }
}

export default handler
