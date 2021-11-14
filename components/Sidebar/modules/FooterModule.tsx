import { Link, Flex, Box } from '@chakra-ui/react'
import ModuleWrapper from '../ModuleWrapper'
import NextLink from 'next/link'
const FooterModule = () => {
    const links = [
        'Help',
        'Scuffed Reddit Coins',
        'Scuffed Reddit Premium',
        'Scuffed Reddit Gifts',
        'About',
        'Careers',
        'Press',
        'Advertise',
        'Blog',
        'Terms',
        'Content Policy',
        'Privacy Policy',
        'Mod Policy',
    ]

    const convertToLink = (link: string) => {
        return link.toLowerCase().replace(/ /g, '-')
    }
    return (
        <ModuleWrapper>
            <Flex justify='between'>
                <Box flex='auto'>
                    {links
                        .filter((e, i) => i < 4)
                        .map((link, index) => (
                            <NextLink
                                key={index}
                                href={convertToLink(link)}
                                passHref
                            >
                                <Link fontSize='12px' d='block'>
                                    {link}
                                </Link>
                            </NextLink>
                        ))}
                </Box>
                <Box flex='auto'>
                    {links
                        .filter((e, i) => i >= 3)
                        .map((link, index) => (
                            <NextLink
                                key={index}
                                href={convertToLink(link)}
                                passHref
                            >
                                <Link fontSize='12px' d='block'>
                                    {link}
                                </Link>
                            </NextLink>
                        ))}
                </Box>
            </Flex>
        </ModuleWrapper>
    )
}

export default FooterModule
