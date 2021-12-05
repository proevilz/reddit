import React from 'react'
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import FooterModule from './modules/FooterModule'
import CommunityModule from './modules/CommunityModule'
import { Sub } from '@prisma/client'
import TopCommunitiesModule from './modules/TopCommunitiesModule'
import HomeModule from './modules/HomeModule'
import { useRouter } from 'next/router'
interface props {
    sub?: sub
}
const Sidebar = ({ sub }: props) => {
    const visible = useBreakpointValue({ sm: false, md: true })
    const router = useRouter()
    return visible ? (
        <Box margin='32px 32px 32px 0' w='310px' as='aside'>
            <Flex direction='column' h='100%'>
                {/* {router.pathname === '/' && <TopCommunitiesModule />}
                {sub && <CommunityModule sub={sub} />}
                {router.pathname === '/' && <HomeModule />} */}
                <TopCommunitiesModule />

                <HomeModule />
                <Box flex='1 1 auto' pos='relative'>
                    <Box pos='sticky' top='50px'>
                        <FooterModule />
                    </Box>
                </Box>
            </Flex>
        </Box>
    ) : (
        <></>
    )
}

export default React.memo(Sidebar)
