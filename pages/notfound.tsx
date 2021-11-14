import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Layout from '../components/Layout'

const NotFound = () => {
    const router = useRouter()
    return (
        <Layout>
            <>
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    h='100vh'
                >
                    <Box
                        borderRadius='50%'
                        bg='gray.300'
                        w='80px'
                        mb='30px'
                        h='80px'
                    />
                    <Text mb='10px'>
                        Sorry, there aren’t any communities on Reddit with that
                        name.
                    </Text>
                    <Text mb='25px'>
                        This community may have been banned or the community
                        name is incorrect.
                    </Text>
                    <Button variant='outline' onClick={() => router.push('/')}>
                        Go home
                    </Button>
                </Flex>
            </>
        </Layout>
    )
}

export default NotFound
