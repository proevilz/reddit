import React, { useEffect, useState } from 'react'
import { Text, Flex, Box, Container } from '@chakra-ui/layout'
import Sidebar from '@components/Sidebar/Sidebar'
import Icon from '@chakra-ui/icon'
import {
    HiOutlineChat,
    HiOutlineDocumentText,
    HiOutlineGift,
    HiOutlineShare,
} from 'react-icons/hi'
import { Button } from '@chakra-ui/button'
import { CommentWithChildren, postWithAuthorAndSub } from 'types/dataTypes'
import { limitText, toolbarConfig } from '@utils/utils'
import { Avatar, Link } from '@chakra-ui/react'
import PostVoteArrows from '@components/PostVoteArrows/PostVoteArrows'
import { formatDistance } from 'date-fns'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
})
import Comment from '@components/Comment'
import { useSession } from 'next-auth/react'
interface props {
    post: postWithAuthorAndSub
    onClose: () => void
}
const PostModal = ({ post, onClose }: props) => {
    const [quillState, setQuillState] = useState('')
    const [comments, setComments] = useState<any[]>()
    const { data: session } = useSession()
    useEffect(() => {
        fetch('/api/comments/' + post.id)
            .then((res) => res.json())
            .then((res) => {
                setComments(res)
                console.log(res)
            })
    }, [post])

    const CommentTree = (comments, child = false) => {
        let items = comments?.map((comment, index) => {
            return (
                <Box
                    mb='20px'
                    key={comment.id}
                    ml={child ? 34 + 34 * index + 'px' : 0}
                    position='relative'
                >
                    <Box
                        h='calc(100% - 28px)'
                        bg='reddit.gray.300'
                        w='2px'
                        position='absolute'
                        top='28px'
                        left='12px'
                    />

                    <Comment comment={comment} />
                    {comment.children && CommentTree(comment.children, true)}
                </Box>
            )
        })

        return items
    }
    return (
        <>
            <Container
                maxW='container.xl'
                position='absolute'
                top='57px'
                left='0'
                right='0'
                zIndex='99'
            >
                <Box bg='black' mx='auto' minHeight='calc(100vh - 57px)'>
                    <Box w='calc(100% - 160px)' mx='auto'>
                        <Flex justify='space-between' with='100%' mb='32px'>
                            <Flex align='center'>
                                <Icon
                                    fontSize='20px'
                                    as={HiOutlineDocumentText}
                                />
                                <Text>{limitText(post.title)}</Text>
                            </Flex>
                            <Button
                                variant='unstyled'
                                fontWeight='light'
                                onClick={onClose}
                            >
                                X close
                            </Button>
                        </Flex>

                        <Flex justify='space-between' alignItems='flex-start'>
                            <Box
                                w='740px'
                                bg='reddit.gray.100'
                                borderRadius='4px'
                                borderColor='reddit.gray.300'
                                borderWidth='1px'
                                borderStyle='solid'
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
                                                    <NextLink
                                                        href={`/r/${post.sub.name}`}
                                                        passHref
                                                    >
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
                                            <Text
                                                fontSize='12px'
                                                color='reddit.gray.400'
                                            >
                                                Posted by{' '}
                                                <NextLink
                                                    href={`/u/${post.author.username}`}
                                                    passHref
                                                >
                                                    <Link>
                                                        u/{post.author.username}
                                                    </Link>
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

                                        <Box
                                            fontSize='sm'
                                            dangerouslySetInnerHTML={{
                                                __html: post.body,
                                            }}
                                        />

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
                                                <Text
                                                    color='reddit.gray.400'
                                                    fontSize='12px'
                                                >
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
                                                <Text
                                                    color='reddit.gray.400'
                                                    fontSize='12px'
                                                >
                                                    Award
                                                </Text>
                                            </Button>
                                            <Button
                                                align='center'
                                                variant='reddit-post'
                                            >
                                                <Icon
                                                    as={HiOutlineShare}
                                                    mr='2'
                                                    stroke='reddit.gray.400'
                                                    strokeWidth='1'
                                                    fill='none'
                                                    fontSize='20px'
                                                />
                                                <Text
                                                    color='reddit.gray.400'
                                                    fontSize='12px'
                                                >
                                                    Share
                                                </Text>
                                            </Button>
                                        </Flex>
                                        <Box mb='20px'>
                                            <Text
                                                mb='5px'
                                                mt='10px'
                                                fontSize='12px'
                                            >
                                                Comment as{' '}
                                                <Link>
                                                    {session?.user?.username}
                                                </Link>
                                            </Text>
                                            <ReactQuill
                                                theme='snow'
                                                value={quillState}
                                                onChange={setQuillState}
                                                modules={{
                                                    toolbar: toolbarConfig,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Flex>
                                <Box p='2'>
                                    {CommentTree(comments)}
                                    {/* <CommentTree comments={comments} /> */}
                                    {/* {comments?.map((comment) => (
                                        <Comment
                                            key={comment.id}
                                            comment={comment}
                                        />
                                    ))} */}
                                </Box>
                            </Box>
                            <Sidebar />
                        </Flex>
                    </Box>
                </Box>
            </Container>

            <style global jsx>{`
                body {
                    background: #191919;
                }
            `}</style>
        </>
    )
}

export default PostModal
