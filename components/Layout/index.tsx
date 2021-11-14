import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React from 'react'
import Loading from '../Loading/Loading'
import Navbar from '../Navbar/Navbar'

const Layout = ({ children }: { children: JSX.Element }) => {
    const { status } = useSession({
        required: false,
    })

    if (status === 'loading') {
        return <Loading />
    }
    return (
        <>
            <Navbar />
            <Box px='20px'>{children}</Box>
        </>
    )
}

export default Layout
