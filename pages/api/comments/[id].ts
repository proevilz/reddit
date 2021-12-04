import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'db'
import { arrayToTree } from 'performant-array-to-tree'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query
        if (typeof id !== 'string') {
            res.status(400).json({ error: 'id must be a string' })
            return
        }
        const rawComments = await prisma.comment.findMany({
            where: {
                postId: id,
            },
            include: {
                author: true,
            },
        })
        const comments = arrayToTree(rawComments, {
            dataField: null,
            parentId: 'parentCommentId',
        })
        res.status(200).json(comments)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong.')
    }
}

export default handler
