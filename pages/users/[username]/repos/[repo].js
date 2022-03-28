import { Box, 
        Flex, 
        Spacer, 
        Button, 
        Center,
        Image,
        Spinner
        } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../../../../store'
import { getUserRepos, getRepoDetail } from '../../../api/index'
import Link from 'next/link'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function Repo() {
const { state : { username } } = useContext(StoreContext)
const [repoDetail, setRepoDetail] = useState(null)
const router = useRouter()
const { repo } = router.query

useEffect(() => {
    console.log(username)
    console.log(repo)
    getRepoDetail(username, repo).then((response) => {
        console.log(response.data)
        setRepoDetail(response.data)
    }).catch(input => {console.log(input.response)})
}, [])

return (
<>
 {/* Header: Title, 搜尋框 */}
    <Flex bg='gray.800' h='8vh' color='white' px='9'>
        <Link 
            href="/users/[username]/repos"
            as={`/users/${username}/repos`}
        >
            <Box cursor='pointer' py='5' fontWeight='bold' letterSpacing='0.1vw'>
                Intern Homework
            </Box>
        </Link>
    <Spacer />
    </Flex>

    <Center bg='gray.50' h='12vh' borderBottom='0.1vw solid lightGray' fontWeight='bold' letterSpacing='0.05vw' fontSize='1.4vw'>
    {
        repoDetail ? 
        <Flex>
            <Box fontSize='2xl'>{repoDetail.full_name}</Box> 
            <Image mt='2.5' ml='5' style={{width:'18px', height:'18px'}} alt='star' src='https://raw.githubusercontent.com/jennyhuoh/nextjs_practice/huoh/public/images/img-star.png' boxSize='50px' />
            <Box mt='1.5' ml='1'>{repoDetail.stargazers_count}</Box>
        </Flex> : 
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        mt='5vh'
        />
    }
    </Center>
    <Center>
    {
        repoDetail ?
        repoDetail.description === null ?
        <Center mt='5vh' w='60vw' p='5' borderRadius='lg' border='1px solid lightgray'>
            No description
        </Center> :
        <Center mt='5vh' w='60vw' p='5' borderRadius='lg' border='1px solid lightgray'>
            {repoDetail.description}
        </Center> : 
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        mt='5vh'
        />
    }
    </Center>
    <Center>
        <Link href={`https://github.com/${username}/${repo}`}>
            <a  target='_blank'>
                <Button mt='5vh' colorScheme='blue' variant='outline' rightIcon={<ArrowForwardIcon />}>
                    Go to the real github page
                </Button> 
            </a>
        </Link>
    </Center>
</>
)}

export async function getStaticProps(context){
    const { repo } = context.params
    return { props: { repo } }
}

export async function getStaticPaths() {
    const response = await getUserRepos('jennyhuoh')
    const data = await response.data
    return {
        paths: data.map(repo => ({
            params: {username: repo.owner.login, repo:repo.full_name}
        })),
        fallback: true
    }
}