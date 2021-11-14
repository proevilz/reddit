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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar/Sidebar'
import { FaChevronDown } from 'react-icons/fa'
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
})

const Post: NextPage = () => {
    const [quillState, setQuillState] = useState('')
    const toolbar = [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ]
    return (
        <Layout>
            <>
                <Flex justify='center' align='start' mt='100px'>
                    <Flex direction='column'>
                        <Flex direction='column'>
                            <Text>Create a post</Text>
                            <Divider my='10px' />
                        </Flex>
                        <Box
                            maxW='640px'
                            w='100%'
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
                                        />
                                        <ReactQuill
                                            theme='snow'
                                            value={quillState}
                                            onChange={setQuillState}
                                            modules={{ toolbar: toolbar }}
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
                                            >
                                                SAVE DRAFT
                                            </Button>
                                            <Button
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
            </>
        </Layout>
    )
}

export default Post
