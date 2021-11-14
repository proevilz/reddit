import { extendTheme } from '@chakra-ui/react'
const theme = extendTheme({
    fonts: {
        heading: 'IBM Plex Sans',
        body: 'IBM Plex Sans',
        noto: 'Noto Sans',
    },
    styles: {
        global: {
            body: {
                bg: '#030303',
                color: 'white',
            },
        },
    },
    colors: {
        reddit: {
            gray: {
                100: '#1a1a1b',
                200: '#161617',
                300: '#343536',
                400: '#818384',
            },
            orange: {
                100: '#cc3700',
            },
        },
    },
    components: {
        Input: {
            parts: ['field'],
            variants: {
                outline: {
                    field: {
                        _placeholder: {
                            color: 'reddit.gray.400',
                        },
                    },
                },
            },
        },
        Box: {
            variants: {
                'sidebar-module': {
                    w: '100%',
                    bg: 'reddit.gray.100',
                    p: '3',
                    color: 'white',
                    borderRadius: '4px',
                    borderColor: 'reddit.gray.300',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                },
            },
        },
        Button: {
            baseStyle: {
                color: 'gray.700',
            },
            variants: {
                outline: {
                    _hover: {
                        background: 'reddit.gray.300',
                    },
                },
                'reddit-post': {
                    bg: 'transparent',
                    boxShadow: 'none',
                    borderRadius: 0,
                    _hover: {
                        background: 'reddit.gray.300',
                    },
                },
            },
        },
        Menu: {
            parts: ['menu', 'item'],
            baseStyle: {
                item: {
                    fontSize: 'sm',
                    _hover: {
                        background: 'reddit.gray.300',
                    },
                },
            },
        },
        Tabs: {
            parts: ['tabs', 'tablist', 'tab'],
            baseStyle: {
                tab: {
                    color: 'gray',
                },
            },
            variants: {
                line: {
                    tab: {
                        _active: {
                            outline: 'none',
                            bg: 'reddit.gray.300',
                        },
                        '--chakra-shadows-outline': 'none',
                        paddingTop: 3,
                        paddingBottom: 3,
                        fontSize: 'sm',
                        borderColor: 'reddit.gray.300',
                        _selected: {
                            color: 'white',
                            borderLeftColor: 'reddit.gray.300',
                            borderRightColor: 'reddit.gray.300',
                            borderBottomColor: '#d9d9d9',
                        },
                    },
                },
            },
        },
    },
})
export default theme
