import { Prisma } from '@prisma/client'

const subredditWithPosts = Prisma.validator<Prisma.SubArgs>()({
    include: { Post: true },
})
export type SubWithPosts = Prisma.SubGetPayload<typeof subredditWithPosts>
