import React from 'react'
import { Flex, Box, Divider, Button, Text, Image } from '@chakra-ui/react'
import router from 'next/router'
import NextLink from 'next/link'
import ModuleWrapper from '../ModuleWrapper'
import { Board } from '@prisma/client'
interface props {
    board?: Board
}
const HomeModule = ({ board }: props) => {
    return (
        <ModuleWrapper px='0' pt='0'>
            <Box
                px='3'
                pt='40px'
                pb='10px'
                bgSize='cover'
                bgImage={`url('https://picsum.photos/300/300?${Math.random()}')`}
                borderRadius='3px'
            />

            <Flex direction='column' px='3' position='relative' top='-10px'>
                <Flex align='center'>
                    <Image
                        mr='10px'
                        w='30px'
                        alt='Mascot'
                        src='/images/redditmascot.png'
                    />
                    <Text fontSize='lg' fontWeight='bold' alignSelf='flex-end'>
                        Home
                    </Text>
                </Flex>
                <Text fontSize='sm' mt='10px'>
                    Your personal Scuffed Reddit frontpage. Come here to check
                    in with your favourite communities.
                </Text>
            </Flex>

            <Flex direction='column' justify='center' px='3'>
                <Button
                    w='100%'
                    onClick={() => router.push('/post')}
                    h='8'
                    color='#1a1a1b'
                    borderRadius='30px'
                    fontSize='14px'
                >
                    Create Post
                </Button>
                <Button
                    w='100%'
                    // onClick={() => router.push('/post')}
                    h='8'
                    borderRadius='30px'
                    mt='6px'
                    fontSize='14px'
                    variant='outline'
                    color='white'
                >
                    Create Community
                </Button>
            </Flex>
        </ModuleWrapper>
    )
}

export default HomeModule
