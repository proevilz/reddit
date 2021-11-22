import React from 'react'
import { Flex, Box, Divider, Button, Text } from '@chakra-ui/react'
import router from 'next/router'
import ModuleWrapper from '../ModuleWrapper'
import { Sub } from '@prisma/client'
const CommunityModule = ({ sub }: { sub: Sub }) => {
    return (
        <ModuleWrapper>
            <Text fontSize='14px' fontWeight='bold' color='white' mb='24px'>
                About community
            </Text>
            <Text mb='10px'>Wecome to /r/{sub.name}</Text>
            <Flex mb='10px'>
                <Box flex='auto'>
                    <Text fontSize='16px' lineHeight='1'>
                        1
                    </Text>
                    <Text fontSize='12px'>Members</Text>
                </Box>
                <Box flex='auto'>
                    <Text fontSize='16px' lineHeight='1'>
                        1
                    </Text>
                    <Text fontSize='12px'>Online</Text>
                </Box>
            </Flex>
            <Divider my='16px' />
            <Flex direction='column'>
                <Text fontSize='14px'>Created 4th Nov 2021</Text>
                <Button
                    onClick={() => router.push('/post')}
                    h='8'
                    color='#1a1a1b'
                    borderRadius='30px'
                    mt='12px'
                    fontSize='14px'
                >
                    Create post
                </Button>
            </Flex>
        </ModuleWrapper>
    )
}

export default CommunityModule
