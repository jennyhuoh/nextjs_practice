import { Box,
    Input, 
    Flex, 
    Spacer, 
    Button, 
    Center, 
    Stat, 
    StatLabel, 
    StatNumber, 
    StatHelpText, 
    VStack,
    FormControl,
    Avatar,
    Grid,
    GridItem,
    Image,
    Spinner
    } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../../../../store'
import { setUsername, setAllRepos } from '../../../../actions'
import { getUserRepos, getUserDetail } from '../../../api/index'
import Link from 'next/link'

export default function Repo() {
const { state : { username , allRepos } , dispatch } = useContext(StoreContext)
// const [user, setUser] = useState(userDetail)
// const [allRepos, setAllRepos] = useState(null)
const [displayedRepos, setDisplayedRepos] = useState([])
const router = useRouter()
const { repo } = router.query
// const { username } = router.query
console.log(repo)
return (
<>
 {/* Header: Title, 搜尋框 */}
 <Flex bg='gray.800' h='8vh' color='white' px='9'>
    <Link href="/">
        <Box py='5' fontWeight='bold' letterSpacing='0.1vw'>
            Intern Homework
        </Box>
    </Link>
   <Spacer />
 </Flex>
 {/* 使用者資料bar */}
 <Center bg='gray.50' h='17vh' borderBottom='0.1vw solid lightGray' fontWeight='bold' letterSpacing='0.05vw' fontSize='1.4vw'>
   <Grid
     h='18vh'
     templateRows='repeat(2, 1fr)'
     templateColumns='repeat(3, 1fr)'
     pt='3'
   >
     {/* <GridItem pt='3' pr='3' rowSpan={2} colSpan={1}><Avatar name='avatar' size='xl' src={user.avatar_url} /></GridItem> */}
     {/* <GridItem pt='7' colSpan={2}>{user.login}'s Repositories</GridItem>
     <GridItem fontSize='sm' pt='2' colSpan={1}>followers: {user.followers}</GridItem>
     <GridItem fontSize='sm' pt='2' colSpan={1}>public_repos: {user.public_repos}</GridItem> */}
   </Grid>
 </Center>

</>
)
}

export async function getStaticProps(context){
    // const repoResponse = await getUserRepos('jennyhuoh')
    // const repoData = await repoResponse.data
    const { repo } = context.params
    // const userResponse = await getUserDetail('jennyhuoh')
    // const userDetail = await userResponse.data
    return { props: { repo } }
}

export async function getStaticPaths() {
    const response = await getUserRepos('jennyhuoh')
    const data = await response.data
    return {
        paths: data.map(repo => ({
            params: {username: repo.owner.login, repo:repo.full_name}
        })),
        // paths: [
        //     'users/jennyhuoh/repos/0413test'
        // ],
        fallback: true
    }
}