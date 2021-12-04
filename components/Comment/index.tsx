import React from 'react'
import { Box, Text, Flex, Avatar, Link, Button, Icon } from '@chakra-ui/react'
import { CommentWithChildren } from 'types/dataTypes'
import NextLink from 'next/link'
import { formatDistance } from 'date-fns'
import PostVoteArrows from '@components/PostVoteArrows/PostVoteArrows'
import { HiOutlineChat } from 'react-icons/hi'
interface props {
    comment: CommentWithChildren
}
const Comment = ({ comment }: props) => {
    return (
        <Box mb='10px'>
            <Flex align='flex-start'>
                <Avatar
                    mr='10px'
                    size='xs'
                    name='Scuffed member'
                    src={'https://picsum.photos/200?' + Math.random()}
                />
                <Flex direction='column'>
                    <Flex align='center'>
                        <NextLink
                            href={`/u/${comment.author.username}`}
                            passHref
                        >
                            <Text fontWeight='bold' fontSize='xs'>
                                {comment.author.username}
                            </Text>
                        </NextLink>
                        <Box w='2px' h='2px' bg='reddit.gray.400' mx='6px' />
                        <Text fontSize='xs' color='reddit.gray.400'>
                            {' '}
                            {formatDistance(
                                new Date(comment.createdAt),
                                new Date()
                            )}{' '}
                            ago
                        </Text>
                    </Flex>
                    <Text fontSize='sm'>{comment?.content}</Text>
                    <Flex mt='5px' align='center'>
                        <PostVoteArrows
                            horizontal
                            votes={500}
                            hasDownVoted={false}
                            hasUpvoted={true}
                        />
                        <Button variant='reddit-post' px='5px' mx='5px'>
                            <Icon
                                as={HiOutlineChat}
                                mr='2'
                                stroke='reddit.gray.400'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
                            />
                            <Text color='reddit.gray.400' fontSize='12px'>
                                Reply
                            </Text>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Comment
