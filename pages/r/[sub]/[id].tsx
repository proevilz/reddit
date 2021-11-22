import React, { useEffect } from 'react'
import { Text, Flex, Box, Container } from '@chakra-ui/layout'
import Layout from '@components/Layout'

import Sidebar from '@components/Sidebar/Sidebar'
import { useRouter } from 'next/router'
import Icon from '@chakra-ui/icon'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { Button } from '@chakra-ui/button'
const Post = () => {
    const router = useRouter()
    const id = router.query.id as string
    // function to limit text to 100 characters
    const limitText = (text: string) => {
        return text.length > 100 ? text.substring(0, 100) + '...' : text
    }
    const post = {
        title: 'ELI5: Does working out for 10 minutes every day do anything or do you have to do a minimum amount of exercise to see any benefit?',
    }
    return (
        <>
            <Layout>
                <Container maxW='container.xl'>
                    <Box
                        mt='57px'
                        bg='black'
                        mx='auto'
                        minHeight='calc(100vh - 57px)'
                    >
                        <Box w='calc(100% - 160px)' mx='auto'>
                            <Flex justify='space-between' with='100%' mb='32px'>
                                <Flex align='center'>
                                    <Icon
                                        fontSize='20px'
                                        as={HiOutlineDocumentText}
                                    />
                                    <Text>{limitText(post.title)}</Text>
                                </Flex>
                                <Button variant='unstyled'>X close</Button>
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
