import { Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { ImArrowUp } from 'react-icons/im'
interface PostVoteArrowsProps {
    votes: number
    hasUpvoted: boolean
    hasDownVoted: boolean
}
const PostVoteArrows = ({
    votes,
    hasUpvoted,
    hasDownVoted,
}: PostVoteArrowsProps) => {
    return (
        <Flex
            w='40px'
            bg='reddit.gray.200'
            direction='column'
            borderRadius='4px'
        >
            <Icon
                mt='10px'
                fontSize='16px'
                fill={hasUpvoted ? 'reddit.orange.100' : 'none'}
                stroke={hasUpvoted ? 'reddit.orange.100' : 'white'}
                _hover={{
                    stroke: 'reddit.orange.100',
                }}
                strokeWidth='1'
                mx='auto'
                as={ImArrowUp}
            />
            <Text
                fontSize='12px'
                textAlign='center'
                fontWeight='bold'
                color='white'
                my='3px'
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
            />
        </Flex>
    )
}

export default PostVoteArrows
