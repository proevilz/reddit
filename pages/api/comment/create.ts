import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'db'
import { getSession } from 'next-auth/react'
import { LoremIpsum } from 'lorem-ipsum'
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
})

lorem.generateWords(1)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await prisma.comment.create({
            data: {
                content: lorem.generateWords(
                    Math.floor(Math.random() * 15) + 1
                ),
                postId: '6199c38e929605d6c507d819',
                authorId: '6185eccbe56acfd46ce9086e',
                parentCommentId: '6199db326faa3231161ad250',
            },
        })
        res.status(200).end()
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong.')
    }
}

export default handler
