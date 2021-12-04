import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { prisma } from 'db'
import { Box, Flex } from '@chakra-ui/react'
import PostBox from '@components/PostBox/PostBox'
import Layout from '@components/Layout'
import Sidebar from '@components/Sidebar/Sidebar'
import { postWithAuthorAndSub, SubWithPosts } from '../../../types/dataTypes'
import PostModal from '@components/PostModal'
import { Portal } from '@chakra-ui/react'
interface Props {
    subreddit: string
}

const Index = ({ subreddit }: Props) => {
    const [sub, setSub] = useState<SubWithPosts>(JSON.parse(subreddit))
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPost, setSelectedPost] =
        useState<postWithAuthorAndSub | null>(null)
    return (
        <Layout>
            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
            <Flex justify='center' align='start' mt='100px'>
                <Box w='640px' minHeight='300px'>
                    {sub?.Post?.map((post, index) => (
                        <PostBox
                            post={post}
                            key={index}
                            onSelectedPost={(post: postWithAuthorAndSub) =>
                                setSelectedPost(post)
                            }
                        />
                    ))}
                </Box>
                <Sidebar sub={sub} />
            </Flex>
        </Layout>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
    const subName = context.params?.sub
    if (typeof subName == 'string') {
        await prisma.$connect()
        const subreddit = await prisma.sub.findUnique({
            where: {
                name: subName,
            },
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

        await prisma.$disconnect()
        if (!subreddit) {
            return {
                redirect: {
                    destination: '/notfound',
                    permanent: false,
                },
            }
        }
        return {
            props: {
                subreddit: JSON.stringify(subreddit),
            },
        }
    }

    return {
        redirect: {
            destination: '/notfound',
            permanent: false,
        },
    }
}
