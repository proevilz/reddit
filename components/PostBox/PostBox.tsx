import React, { useEffect } from 'react'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Text,
} from '@chakra-ui/react'
import { HiOutlineChat, HiOutlineShare, HiOutlineGift } from 'react-icons/hi'
import PostVoteArrows from '../PostVoteArrows/PostVoteArrows'
import NextLink from 'next/link'
import { postWithAuthorAndSub } from 'types/dataTypes'
import { formatDistance } from 'date-fns'
import { useRouter } from 'next/router'
import { slugify } from '@utils/utils'

interface props {
    post: postWithAuthorAndSub
    onSelectedPost?: (post: postWithAuthorAndSub) => void
}
const PostBox = ({ post, onSelectedPost }: props) => {
    const router = useRouter()

    const handleNavigateToPost = () => {
        history.replaceState(
            null,
            'null',
            `/r/${post.sub.name}/post/${post.id}/${slugify(post.title)}`
        )
        if (onSelectedPost) onSelectedPost(post)
    }

    return (
        <Box
            onClick={handleNavigateToPost}
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
                    <Flex align='center'>
                        {post.sub && (
                            <>
                                <NextLink href={`/r/${post.sub.name}`} passHref>
                                    <Flex align='center'>
                                        <Avatar
                                            mr='10px'
                                            size='xs'
                                            name='Scuffed member'
                                            src={
                                                'https://picsum.photos/200?' +
                                                Math.random()
                                            }
                                        />

                                        <Link
                                            fontSize='xs'
                                            fontWeight='700'
                                        >{`/r/${post.sub.name}`}</Link>
                                    </Flex>
                                </NextLink>
                                <Box
                                    w='2px'
                                    h='2px'
                                    bg='reddit.gray.400'
                                    mx='6px'
                                />
                            </>
                        )}
                        <Text fontSize='12px' color='reddit.gray.400'>
                            Posted by{' '}
                            <NextLink
                                href={`/u/${post.author.username}`}
                                passHref
                            >
                                <Link>u/{post.author.username}</Link>
                            </NextLink>{' '}
                            {formatDistance(
                                new Date(post.createdAt),
                                new Date()
                            )}{' '}
                            ago
                        </Text>
                    </Flex>
                    <Text
                        fontSize='18px'
                        fontWeight='500'
                        color='white'
                        my='10px'
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
                                stroke='reddit.gray.400'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
                            />
                            <Text color='reddit.gray.400' fontSize='12px'>
                                0 Comments
                            </Text>
                        </Button>
                        <Button variant='reddit-post'>
                            <Icon
                                as={HiOutlineGift}
                                mr='2'
                                stroke='reddit.gray.400'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
                            />
                            <Text color='reddit.gray.400' fontSize='12px'>
                                Award
                            </Text>
                        </Button>
                        <Button align='center' variant='reddit-post'>
                            <Icon
                                as={HiOutlineShare}
                                mr='2'
                                stroke='reddit.gray.400'
                                strokeWidth='1'
                                fill='none'
                                fontSize='20px'
                            />
                            <Text color='reddit.gray.400' fontSize='12px'>
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
