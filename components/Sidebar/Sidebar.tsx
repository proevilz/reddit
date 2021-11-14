import React from 'react'
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import FooterModule from './modules/FooterModule'
import CommunityModule from './modules/CommunityModule'
import { Board } from '@prisma/client'
import TopCommunitiesModule from './modules/TopCommunitiesModule'
import HomeModule from './modules/HomeModule'
import { useRouter } from 'next/router'
interface props {
    board?: Board
}
const Sidebar = ({ board }: props) => {
    const visible = useBreakpointValue({ sm: false, md: true })
    const router = useRouter()
    return visible ? (
        <Flex direction='column'>
            <Box ml='24px' w='310px'>
                {router.pathname === '/' && <TopCommunitiesModule />}
                {board && <CommunityModule board={board} />}
                {router.pathname === '/' && <HomeModule />}
                <FooterModule />
            </Box>
        </Flex>
    ) : (
        <></>
    )
}

export default React.memo(Sidebar)
