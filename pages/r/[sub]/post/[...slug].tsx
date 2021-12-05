import React, { useEffect } from 'react'
import { Text, Flex, Box, Container } from '@chakra-ui/layout'
import Layout from '@components/Layout'
import { prisma } from 'db'
import Sidebar from '@components/Sidebar/Sidebar'
import { useRouter } from 'next/router'
import Icon from '@chakra-ui/icon'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { Button } from '@chakra-ui/button'
import { GetServerSideProps } from 'next'

import { postWithAuthorAndSub } from 'types/dataTypes'
import { limitText } from '@utils/utils'
interface props {
    postData: string
}
const Post = ({ postData }: props) => {
    // function to limit text to 100 characters
    const router = useRouter()

    const post: postWithAuthorAndSub = JSON.parse(postData)
    const handleClose = () => {
        history.replaceState(null, 'null', `/r/${post.sub.name}`)
        router.push('/r/[sub]', `/r/${router.query.sub}`)
    }
    return (
        <>
            <Layout>
                <Container maxW='container.xl'>
                    <Box bg='black' mx='auto' minHeight='calc(100vh - 57px)'>
                        <Box w='calc(100% - 160px)' mx='auto'>
                            <Flex justify='space-between' with='100%' mb='32px'>
                                <Flex align='center'>
                                    <Icon
                                        fontSize='20px'
                                        as={HiOutlineDocumentText}
                                    />
                                    <Text>{limitText(post.title)}</Text>
                                </Flex>
                                <Button
                                    variant='unstyled'
                                    onClick={handleClose}
                                >
                                    X close
                                </Button>
                            </Flex>

                            <Flex justify='space-between'>
                                <Box
                                    w='740px'
                                    bg='reddit.gray.100'
                                    borderRadius='4px'
                                    borderColor='reddit.gray.300'
                                    borderWidth='1px'
                                    borderStyle='solid'
                                    minH='400px'
                                ></Box>
                                <Sidebar />
                            </Flex>
                        </Box>
                    </Box>
                </Container>
            </Layout>
            <style global jsx>{`
                body {
                    background: #191919;
                }
            `}</style>
        </>
    )
}

export default Post

export const getServerSideProps: GetServerSideProps = async (context) => {
    await prisma.$connect()
    const post = await prisma.post.findUnique({
        where: {
            id: context.query.slug[0] as string,
        },
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
            postData: JSON.stringify(post),
        }, // will be passed to the page component as props
    }
}
