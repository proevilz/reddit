import React from 'react'
import { Flex, Box, Button, Text, Image } from '@chakra-ui/react'

import NextLink from 'next/link'
import ModuleWrapper from '../ModuleWrapper'
import { Board } from '@prisma/client'
interface props {
    board?: Board
}
const CommunityModule = ({ board }: props) => {
    const communities = [
        {
            name: '/r/photography',
            image: 'https://picsum.photos/32/32?${Math.random()}',
        },
        {
            name: '/r/cooking',
            image: 'https://picsum.photos/32/32?${Math.random()}',
        },
        {
            name: '/r/programming',
            image: 'https://picsum.photos/32/32?${Math.random()}',
        },
        {
            name: '/r/gaming',
            image: 'https://picsum.photos/32/32?${Math.random()}',
        },
    ]
    return (
        <ModuleWrapper px='0' pt='0'>
            <Box
                px='3'
                pt='40px'
                pb='10px'
                bgSize='cover'
                bgImage="url('https://picsum.photos/300/300')"
                borderRadius='3px'
            >
                <Text fontSize='16px' fontWeight='bold' color='white'>
                    Top communities
                </Text>
            </Box>
            <Flex mb='10px' direction='column'>
                {communities.map((community, index) => (
                    <Flex
                        key={index}
                        borderBottom='1px solid #2d2c2c'
                        h='48px'
                        px='12px'
                        align='center'
                    >
                        <NextLink href={community.name}>
                            <a>
                                <Flex align='center' justify='start'>
                                    <Text ml='10px' mr='25px'>
                                        {index + 1}
                                    </Text>
                                    <Flex align='center'>
                                        <Image
                                            rounded='full'
                                            mx='8px'
                                            alt={community.name + ' profile'}
                                            src={
                                                community.image +
                                                '?' +
                                                Math.random()
                                            }
                                        />
                                        <Text fontWeight='500'>
                                            {community.name}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </a>
                        </NextLink>
                    </Flex>
                ))}
            </Flex>

            <Flex justify='center' px='10px'>
                <Button
                    w='100%'
                    // onClick={() => router.push('/post')}
                    h='8'
                    color='#1a1a1b'
                    borderRadius='30px'
                    mt='12px'
                    fontSize='14px'
                >
                    View All
                </Button>
            </Flex>
        </ModuleWrapper>
    )
}

export default CommunityModule
