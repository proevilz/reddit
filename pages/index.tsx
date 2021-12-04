import { Box, Flex } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import { GetServerSideProps } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import { prisma } from 'db'
import PostBox from '../components/PostBox/PostBox'
import Sidebar from '../components/Sidebar/Sidebar'
import { postWithAuthorAndSub } from 'types/dataTypes'
interface props {
    posts: string
}
const Home = ({ posts }: props) => {
    const allPosts = JSON.parse(posts) as postWithAuthorAndSub[]

    return (
        <Layout>
            <Flex justify='center' align='start' mt='100px'>
                <Box w='640px' minHeight='300px'>
                    {allPosts.map((post) => (
                        <PostBox key={post.id} post={post} />
                    ))}
                </Box>
                <Sidebar />
            </Flex>
        </Layout>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    await prisma.$connect()
    const posts = await prisma.post.findMany({
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
    return {
        props: {
            posts: JSON.stringify(posts) ?? [],
        }, // will be passed to the page component as props
    }
}
