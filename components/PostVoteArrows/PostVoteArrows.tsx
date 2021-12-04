import { Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { ImArrowUp } from 'react-icons/im'
interface PostVoteArrowsProps {
    votes: number
    hasUpvoted: boolean
    hasDownVoted: boolean
    withBg?: boolean
    horizontal?: boolean
}
const PostVoteArrows = ({
    votes,
    hasUpvoted,
    hasDownVoted,
    withBg,
    horizontal,
}: PostVoteArrowsProps) => {
    return (
        <Flex
            w={horizontal ? 'auto' : '40px'}
            bg={withBg ? 'reddit.gray.200' : ''}
            direction={horizontal ? 'row' : 'column'}
            align='center'
            borderRadius='4px'
        >
            <Icon
                mt={horizontal ? '' : '10px'}
                fontSize='16px'
                fill={hasUpvoted ? 'reddit.orange.100' : 'none'}
                stroke={hasUpvoted ? 'reddit.orange.100' : 'white'}
                _hover={{
                    stroke: 'reddit.orange.100',
                }}
                strokeWidth='1'
                mx='auto'
                as={ImArrowUp}
                cursor='pointer'
            />
            <Text
                fontSize='12px'
                textAlign='center'
                fontWeight='bold'
                color='white'
                my='3px'
                mx={horizontal ? '5px' : ''}
            >
                {votes}
            </Text>
            <Icon
                fontSize='16px'
                fill={hasDownVoted ? 'reddit.orange.100' : 'none'}
                stroke={hasDownVoted ? 'reddit.orange.100' : 'white'}
                strokeWidth='1'
                transform='rotate(180deg)'
                _hover={{
                    stroke: 'reddit.orange.100',
                }}
                m='0 auto'
                as={ImArrowUp}
                cursor='pointer'
            />
        </Flex>
    )
}

export default PostVoteArrows
