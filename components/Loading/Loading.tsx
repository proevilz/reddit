import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
    return (
        <Flex
            bg='rgba(0,0,0,0.5)'
            align='center'
            justify='center'
            position='absolute'
            top='0'
            left='0'
            right='0'
            w='100vw'
            h='100vh'
            zIndex='99'
        >
            <Spinner />
        </Flex>
    )
}

export default Loading
