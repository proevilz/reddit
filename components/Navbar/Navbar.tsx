import React from 'react'
import {
    Box,
    Text,
    Button,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Avatar,
    AvatarBadge,
} from '@chakra-ui/react'
import Logo from '../Logo/LogoImage'
import LogoText from '../Logo/LogoText'
import NextLink from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
    const { data: session, status } = useSession()
    return (
        <Flex
            w='100%'
            px='3'
            py='2'
            bg='reddit.gray.100'
            position='fixed'
            top='0'
            borderBottomColor='reddit.gray.300'
            borderBottomWidth='1px'
            borderBottomStyle='solid'
            justify='space-between'
        >
            <NextLink href='/' passHref>
                <Flex as='a'>
                    <Box as={Logo} mr='10px' />
                    <LogoText />
                </Flex>
            </NextLink>
            {status !== 'authenticated' ? (
                <Flex>
                    <Button
                        as='a'
                        mr='3'
                        w='120px'
                        variant='outline'
                        borderRadius='30px'
                        onClick={() => signIn('github')}
                    >
                        Log In
                    </Button>

                    <Button
                        as='a'
                        w='120px'
                        variant='solid'
                        borderRadius='30px'
                        onClick={() => signIn('github')}
                    >
                        Sign up
                    </Button>
                </Flex>
            ) : (
                <Menu gutter={-1}>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                bg='transparent'
                                color='white'
                                textAlign='left'
                                w='3xs'
                                borderWidth='1px'
                                borderColor='reddit.gray.300'
                                borderBottomColor={
                                    isOpen ? 'transparent' : 'reddit.gray.300'
                                }
                                borderRadius='3px'
                                pb='5px'
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    paddingLeft='0.8rem'
                                    paddingRight='0.8rem'
                                >
                                    <Flex align='end'>
                                        <Avatar
                                            mr='2'
                                            w='24px'
                                            h='24px'
                                            borderRadius='3px'
                                            name='Dan Abrahmov'
                                            src='https://bit.ly/dan-abramov'
                                        >
                                            <AvatarBadge
                                                boxSize='12px'
                                                borderColor='reddit.gray.100'
                                                bg='green.500'
                                            />
                                        </Avatar>
                                        <Flex direction='column'>
                                            <Text
                                                fontSize='xs'
                                                fontWeight='bold'
                                            >
                                                ProEvilz
                                            </Text>
                                            <Text fontSize='xs' lineHeight='1'>
                                                900 Karma
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Icon as={FaChevronDown} />
                                </Flex>
                            </MenuButton>
                            <MenuList
                                bg='reddit.gray.100'
                                borderTopLeftRadius='0'
                                borderTop='none'
                                borderTopRightRadius='0'
                                borderColor='reddit.gray.300'
                            >
                                <MenuItem>Download</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            )}
        </Flex>
    )
}

export default Navbar
