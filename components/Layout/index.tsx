import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Loading from '../Loading/Loading'
import Navbar from '../Navbar/Navbar'
interface Props {
    children?: React.ReactNode
}
const Layout = (props: Props) => {
    const { status } = useSession({
        required: false,
    })

    if (status === 'loading') {
        return <Loading />
    }
    return (
        <Flex direction='column'>
            <Navbar />
            <Box px='20px'>{props.children}</Box>
        </Flex>
    )
}

export default Layout
