import { GetServerSideProps } from 'next'
import { PrismaClient, Board } from '@prisma/client'
import { Box, Flex } from '@chakra-ui/react'
import PostBox from '../../components/PostBox/PostBox'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar/Sidebar'
const prisma = new PrismaClient()

const Board = ({ boardData }: { boardData: string }) => {
    const [board, setBoard] = useState<Board | undefined>()

    useEffect(() => {
        const data = JSON.parse(boardData) ?? {}
        setBoard(data)
    }, [boardData])

    return (
        <Layout>
            <>
                <Flex justify='center' align='start' mt='100px'>
                    <Box w='640px' minHeight='300px'>
                        {Array.from(Array(10).keys()).map((n) => (
                            <PostBox key={n} />
                        ))}
                    </Box>
                    <Sidebar board={board} />
                </Flex>
            </>
        </Layout>
    )
}

export default Board

export const getServerSideProps: GetServerSideProps = async (context) => {
    const boardName = context.params?.board
    if (typeof boardName == 'string') {
        await prisma.$connect()
        const boardData = await prisma.board.findUnique({
            where: {
                name: boardName,
            },
        })
        if (!boardData) {
            return {
                redirect: {
                    destination: '/notfound',
                    permanent: false,
                },
            }
        }
        return {
            props: {
                boardData: JSON.stringify(boardData),
            },
        }
    }

    return {
        redirect: {
            destination: '/notfound',
            permanent: false,
        },
    }
}
