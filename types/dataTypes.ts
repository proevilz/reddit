import { Prisma, Comment } from '@prisma/client'

// const subredditWithPosts = Prisma.validator<Prisma.SubArgs>()({
//     include: { Post: true },
// })
const subredditWithPosts = Prisma.validator<Prisma.SubArgs>()({
    include: {
        Post: {
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
                sub: {
                    select: {
                        name: true,
                    },
                },
            },
        },
    },
})

const postWithAuthorAndSub = Prisma.validator<
    Prisma.SubArgs & Prisma.PostArgs
>()({
    include: {
        sub: {
            select: {
                name: true,
            },
        },
        author: {
            select: {
                username: true,
            },
        },
    },
})

export type postWithAuthorAndSub = Prisma.PostGetPayload<
    typeof postWithAuthorAndSub
>
export type SubWithPosts = Prisma.SubGetPayload<typeof subredditWithPosts>

export interface CommentWithChildren extends Comment {
    children?: Comment[]
}
