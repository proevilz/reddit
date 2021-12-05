import React, { useEffect, useState } from 'react'
import { Text, Flex, Box, Stack } from '@chakra-ui/layout'
import { CloseIcon } from '@chakra-ui/icons'
import { Spinner } from '@chakra-ui/react'
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
    loading: () => <Spinner />,
})
import Comment from '@components/Comment'
import { useSession } from 'next-auth/react'
interface props {
    post: postWithAuthorAndSub
    onClose: () => void
}
const PostModal = ({ post, onClose }: props) => {
    const [quillState, setQuillState] = useState('')
    const [comments, setComments] = useState<CommentWithChildren[]>()
    const { data: session } = useSession()
    useEffect(() => {
        fetch('/api/comments/' + post.id)
            .then((res) => res.json())
            .then((res) => {
                setComments(res)
                console.log(res)
            })
    }, [post])

    const CommentTree = (
        comments: CommentWithChildren[] | undefined,
        child: boolean = false
    ) => {
        if (!comments) return <></>
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
        <Box
            w='100%'
            position='relative'
            overflowY='auto'
            zIndex='99'
            height='100%'
        >
            <Flex
                justify='space-between'
                position='sticky'
                width='calc(100% - 160px)'
                left='0'
                right='0'
                top='0'
                mx='auto'
                bg='black'
                zIndex='99'
                maxW='1280px'
                px='110px'
            >
                <Flex align='center'>
                    <Icon fontSize='20px' as={HiOutlineDocumentText} />
                    <Text fontSize='sm' fontWeight='500' ml='15px'>
                        {limitText(post.title)}
                    </Text>
                </Flex>
                <Button
                    d='flex'
                    alignItems='center'
                    variant='unstyled'
                    fontWeight='light'
                    onClick={onClose}
                    fontSize='sm'
                    leftIcon={<CloseIcon />}
                >
                    close
                </Button>
            </Flex>

            <Flex justify='center' mx='auto' pb='40px'>
                <Box
                    as='main'
                    w='740px'
                    bg='reddit.gray.100'
                    borderRadius='4px'
                    borderColor='reddit.gray.300'
                    borderWidth='1px'
                    borderStyle='solid'
                    margin='32px 12px 32px 32px'
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

                            <Box
                                fontSize='sm'
                                dangerouslySetInnerHTML={{
                                    __html: post.body,
                                }}
                            />

                            <Flex mt='20px'>
                                <Flex px='16px' align='center'>
                                    <Icon
                                        as={HiOutlineChat}
                                        mr='2'
                                        stroke='reddit.gray.400'
                                        strokeWidth='1'
                                        fill='none'
                                        fontSize='20px'
                                    />
                                    <Text
                                        fontWeight='semibold'
                                        color='reddit.gray.400'
                                        fontSize='12px'
                                    >
                                        {comments?.length} Comments
                                    </Text>
                                </Flex>
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
                                <Button align='center' variant='reddit-post'>
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
                            <Box mb='20px' mr='20px'>
                                <Text mb='5px' mt='10px' fontSize='12px'>
                                    Comment as{' '}
                                    <Link color='blue.300'>
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

                    <Box ml='40px' p='5' pl='0'>
                        {comments?.length > 0 ? (
                            CommentTree(comments)
                        ) : (
                            <Spinner />
                        )}
                    </Box>
                </Box>
                <Sidebar />
            </Flex>
        </Box>
    )
}

export default PostModal
