import { Box, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'

import PostBox from '../components/PostBox/PostBox'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: NextPage = () => {
    return (
        <Layout>
            <Flex justify='center' align='start' mt='100px'>
                <Box w='640px' minHeight='300px'>
                    {Array.from(Array(10).keys()).map((n) => (
                        <PostBox key={n} />
                    ))}
                </Box>
                <Sidebar />
            </Flex>
        </Layout>
    )
}

export default Home
