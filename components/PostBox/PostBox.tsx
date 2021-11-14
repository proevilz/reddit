import React from 'react'
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { ImBubble, ImShare2 } from 'react-icons/im'
import PostVoteArrows from '../PostVoteArrows/PostVoteArrows'

const PostBox = () => {
    return (
        <Box
            w='100%'
            bg='reddit.gray.100'
            mb='10px'
            borderRadius='4px'
            borderColor='reddit.gray.300'
            borderWidth='1px'
            borderStyle='solid'
            cursor='pointer'
            _hover={{
                borderColor: 'reddit.gray.400',
            }}
        >
            <Flex>
                <PostVoteArrows
                    votes={500}
                    hasDownVoted={false}
                    hasUpvoted={true}
                />
                <Box w='100%' p='2' pb='2px'>
                    <Text fontSize='12px' color='gray.300'>
                        Posted by u/ProEvilz 10 hours ago
                    </Text>
                    <Text fontSize='18px' color='white'>
                        New scuffed Reddit clone launches!
                    </Text>
                    <Image
                        m='20px auto'
                        src={`https://picsum.photos/400/500?${Math.random()}`}
                        alt='random image'
                    />
                    <Flex mt='20px'>
                        <Button variant='reddit-post'>
                            <Icon
                                as={ImBubble}
                                mr='2'
                                stroke='white'
                                strokeWidth='1'
                                fill='none'
                            />
                            <Text color='white' fontSize='12px'>
                                200 Comments
                            </Text>
                        </Button>
                        <Button variant='reddit-post'>
                            <Icon
                                as={ImBubble}
                                mr='2'
                                stroke='white'
                                strokeWidth='1'
                                fill='none'
                            />
                            <Text color='white' fontSize='12px'>
                                200 Comments
                            </Text>
                        </Button>
                        <Button align='center' variant='reddit-post'>
                            <Icon
                                as={ImShare2}
                                mr='2'
                                stroke='white'
                                strokeWidth='1'
                                fill='none'
                            />
                            <Text color='white' fontSize='12px'>
                                Share
                            </Text>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default React.memo(PostBox)
