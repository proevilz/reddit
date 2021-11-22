import React from 'react'
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { HiOutlineChat, HiOutlineShare, HiOutlineGift } from 'react-icons/hi'
import PostVoteArrows from '../PostVoteArrows/PostVoteArrows'
import { Post } from '.prisma/client'

const PostBox = ({ post }: { post: Post }) => {
    return (
        <Box
            w='100%'
            mb='10px'
            bg='reddit.gray.100'
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
                    <Text
                        fontSize='18px'
                        fontWeight='500'
                        color='white'
                        mb='10px'
                    >
                        {post?.title}
                    </Text>
                    {post?.category === 'IMAGE' && (
                        <Image
                            m='20px auto'
                            src={`https://picsum.photos/400/500?${Math.random()}`}
                            alt='random image'
                        />
                    )}
                    {post?.body && (
                        <Box
                            fontSize='sm'
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />
                    )}
                    <Flex mt='20px'>
                        <Button variant='reddit-post'>
                            <Icon
                                as={HiOutlineChat}
                                mr='2'
                                stroke='white'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
                            />
                            <Text color='white' fontSize='12px'>
                                0 Comments
                            </Text>
                        </Button>
                        <Button variant='reddit-post'>
                            <Icon
                                as={HiOutlineGift}
                                mr='2'
                                stroke='white'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
                            />
                            <Text color='white' fontSize='12px'>
                                Award
                            </Text>
                        </Button>
                        <Button align='center' variant='reddit-post'>
                            <Icon
                                as={HiOutlineShare}
                                mr='2'
                                stroke='white'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
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
