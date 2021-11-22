import React, { useState } from 'react'
import type { NextPage } from 'next'
import {
    Box,
    Button,
    Divider,
    Flex,
    Input,
    Tab,
    TabList,
    Text,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Layout from '@components/Layout'
import Sidebar from '@components/Sidebar/Sidebar'
import { toolbarConfig } from '@utils/utils'
import { useRouter } from 'next/router'

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
})

const Post: NextPage = () => {
    const [quillState, setQuillState] = useState('')
    const [title, setTitle] = useState('')
    const router = useRouter()

    const addPost = async (draft = false) => {
        try {
            await fetch('/api/posts/create', {
                method: 'POST',
                body: JSON.stringify({ title, body: quillState, draft }),
            })
            router.push('/r/test')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
            <Flex justify='center' align='start' mt='100px'>
                <Flex direction='column'>
                    <Flex direction='column'>
                        <Text>Create a post</Text>
                        <Divider my='10px' />
                    </Flex>
                    <Box
                        w='640px'
                        bg='reddit.gray.100'
                        mb='10px'
                        borderRadius='4px'
                    >
                        <Tabs isLazy isFitted>
                            <TabList>
                                <Tab>Post</Tab>
                                <Tab
                                    borderRightWidth='1px'
                                    borderRightColor='reddit.gray.300'
                                    borderLeftWidth='1px'
                                    borderLeftColor='reddit.gray.300'
                                >
                                    Images
                                </Tab>
                                <Tab>Link</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Input
                                        placeholder='Title'
                                        mb='20px'
                                        borderColor='reddit.gray.300'
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        value={title}
                                    />
                                    <ReactQuill
                                        theme='snow'
                                        value={quillState}
                                        onChange={setQuillState}
                                        modules={{ toolbar: toolbarConfig }}
                                    />
                                    <Divider my='20px' />
                                    <Flex justify='end'>
                                        <Button
                                            variant='outline'
                                            mr='10px'
                                            color='gray.200'
                                            h='30'
                                            fontSize='sm'
                                            borderRadius='30px'
                                            onClick={() => addPost(true)}
                                        >
                                            SAVE DRAFT
                                        </Button>
                                        <Button
                                            onClick={() => addPost(false)}
                                            borderRadius='30px'
                                            fontSize='sm'
                                            px='5'
                                            h='30'
                                        >
                                            POST
                                        </Button>
                                    </Flex>
                                </TabPanel>

                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Flex>
                <Sidebar />
            </Flex>
        </Layout>
    )
}

export default Post
