import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'db'
import { getSession } from 'next-auth/react'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    const { title, body, draft, subId } = JSON.parse(req?.body)

    // Ensure only POST requests are accepted
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }
    // Ensure all data is present in the request
    if (!title || !body || draft === undefined) {
        res.status(400).send('Request missing required data')
        return
    }

    if (session) {
        const authorId = session.user.id
        try {
            await prisma.post.create({
                data: {
                    title: title,
                    body: body,
                    published: draft,
                    author: {
                        connect: { id: authorId },
                    },
                    sub: {
                        connect: { id: '6199bfa5b9abd6e7dde83f64' },
                    },
                },
            })
            res.status(200).end()
        } catch (error) {
            console.error(error)
            res.status(500).send('Something went wrong.')
        }
    } else {
        res.status(500).send('Something went wrong.')
    }
}

export default handler
