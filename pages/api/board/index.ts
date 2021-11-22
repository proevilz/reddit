import { prisma } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await prisma.$connect()
    await prisma.sub.create({
        data: {
            name: 'test',
            title: 'testtest',
        },
    })
    await prisma.$disconnect()
    res.status(200).end()
}
