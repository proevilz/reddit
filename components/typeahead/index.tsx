import React, { useRef, useState } from 'react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Input, Text, Avatar, Box, Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useOutsideClick } from '@chakra-ui/react'

const Typeahead = ({ sub }) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const ref = useRef(null)
    const handleFocus = () => {
        setIsOpen(true)
    }
    useOutsideClick({
        ref: ref,
        handler: () => setIsOpen(false),
    })
    return (
        <Box as='div' pos='absolute' ref={ref}>
            <Flex
                bg='reddit.gray.100'
                width='320px'
                borderRadius='4px'
                borderColor='reddit.gray.300'
                borderWidth='1px'
                borderStyle='solid'
                alignItems='center'
                borderBottomColor={isOpen ? 'transparent' : 'reddit.gray.300'}
                borderBottomLeftRadius={isOpen ? 0 : '4px'}
                borderBottomRightRadius={isOpen ? 0 : '4px'}
                px='8px'
            >
                {sub && !isOpen ? (
                    <Avatar
                        mr='10px'
                        size='xs'
                        name='Scuffed member'
                        src={'https://picsum.photos/200?' + Math.random()}
                    />
                ) : isOpen ? (
                    <SearchIcon mr='10px' />
                ) : (
                    <Box
                        borderRadius='50%'
                        borderStyle='dashed'
                        borderWidth='1px'
                        borderColor='reddit.gray.400'
                        width='22px'
                        height='22px'
                        mr='10px'
                    />
                )}
                <Input
                    border='none'
                    borderRadius={0}
                    px='0'
                    width='auto'
                    value={sub ? `/r/${sub}` : ''}
                    flex='auto'
                    onClick={handleFocus}
                    _focus={{
                        outline: 'none',
                    }}
                />
                <ChevronDownIcon
                    cursor='pointer'
                    fontSize='20px'
                    color='reddit.gray.400'
                    onClick={handleFocus}
                />
            </Flex>
            {isOpen && (
                <Flex
                    direction='column'
                    width='320px'
                    borderTopLeftRadius={0}
                    borderTopRightRadius={0}
                    bg='reddit.gray.100'
                    borderColor='reddit.gray.300'
                    borderWidth='1px'
                    borderStyle='solid'
                    px='10px'
                    maxH='400px'
                    overflowY='auto'
                >
                    <Flex justifyContent='space-between' align='center'>
                        <Text
                            fontWeight='bold'
                            fontSize='10px'
                            color='reddit.gray.400'
                            my='10px'
                        >
                            MY COMMUNITIES
                        </Text>
                        <Button
                            onClick={() => router.push('/createcommunity')}
                            variant='unstyled'
                            fontSize='12px'
                            color='reddit.gray.500'
                            h='auto'
                            py='3px'
                            pl='10px'
                            pr='10px'
                            borderRadius='15px'
                            _hover={{
                                bg: 'reddit.gray.300',
                            }}
                        >
                            Create New
                        </Button>
                    </Flex>
                    {Array.from(Array(10).keys()).map((i) => (
                        <Flex
                            key={i}
                            py='3px'
                            cursor='pointer'
                            mb='5px'
                            onClick={() => router.push('/r/test/submit')}
                        >
                            <Avatar
                                size='sm'
                                name='Scuffed member'
                                src={
                                    'https://picsum.photos/200?' + Math.random()
                                }
                            />
                            <Flex ml='10px' direction='column'>
                                <Text fontSize='sm' fontWeight='500'>
                                    /r/Test
                                </Text>
                                <Text fontSize='xs' color='reddit.gray.400'>
                                    124,984,321 members
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Box>
    )
}

export default Typeahead

{
    /* <Menu gutter={-1}>
{({ isOpen }) => (
    <>
        {isOpen ? (
            <Input />
        ) : (
            <MenuButton
                aria-label='Options'
                variant='outline'
                bg='reddit.gray.100'
                width='320px'
                borderRadius='4px'
                borderColor='reddit.gray.300'
                borderWidth='1px'
                borderStyle='solid'
                borderBottomColor={
                    isOpen
                        ? 'transparent'
                        : 'reddit.gray.400'
                }
                borderBottomLeftRadius={
                    isOpen ? 0 : '4px'
                }
                borderBottomRightRadius={
                    isOpen ? 0 : '4px'
                }
                _expanded={{
                    bg: 'reddit.gray.100',
                }}
                _active={{ bg: 'reddit.gray.100' }}
                rightIcon={
                    <ChevronDownIcon
                        fontSize='20px'
                        color='reddit.gray.400'
                    />
                }
                textAlign='left'
            >
                <Flex align='center'>
                    <Box
                        borderRadius='50%'
                        borderStyle='dashed'
                        borderWidth='1px'
                        borderColor='reddit.gray.400'
                        width='22px'
                        height='22px'
                        mr='10px'
                    />
                    <Text
                        fontSize='sm'
                        fontWeight='500'
                    >
                        Choose a community
                    </Text>
                </Flex>
            </MenuButton>
        )}
        <MenuList
            width='320px'
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            bg='reddit.gray.100'
            borderColor='reddit.gray.300'
            borderWidth='1px'
            borderStyle='solid'
        >
            <MenuItem>New Tab</MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Open Closed Tab</MenuItem>
            <MenuItem>Open File...</MenuItem>
        </MenuList>
    </>
)}
</Menu> */
}
