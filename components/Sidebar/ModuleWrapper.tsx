import { Box } from '@chakra-ui/layout'
import { HTMLChakraProps } from '@chakra-ui/system'

const ModuleWrapper = (props: HTMLChakraProps<'div'>) => (
    <Box
        w='100%'
        bg='reddit.gray.100'
        p='3'
        color='white'
        borderRadius='4px'
        borderColor='reddit.gray.300'
        borderWidth='1px'
        borderStyle='solid'
        mb='20px'
        {...props}
    >
        {props.children}
    </Box>
)

export default ModuleWrapper
