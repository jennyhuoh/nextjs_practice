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
import { StoreContext } from '../../../store'
import { setUsername, setAllRepos } from '../../../actions'
import { getUserRepos, getUserDetail } from '../../api/index'
import Link from 'next/link'

export default function Repos({userDetail}) {
  const { state : { username , allRepos } , dispatch } = useContext(StoreContext)
  const [user, setUser] = useState(userDetail)
  // const [allRepos, setAllRepos] = useState(null)
  const [displayedRepos, setDisplayedRepos] = useState([])
  const router = useRouter()
  // const { username } = router.query;

  // useEffect(() => {
  //   getUserDetail(username).then((response) => {  // GET使用者資料，包含圖片、followers人數以及公開的repositories數量
  //     setUserData(response.data)
  //     console.log(response.data)
  //     getUserRepos(username).then((response) => { // GET使用者的所有repositories
  //       router.push(`/users/${username}/repos`)
  //       setAllRepos(dispatch, response.data)
  //       console.log(response.data)
  //     }).catch(input => {console.log(input.response)})
  //   }).catch(input => {console.log(input.response)})
  // }, [username])
  useEffect(() => {
    getUserDetail(username).then((response) => {  // GET使用者資料，包含圖片、followers人數以及公開的repositories數量
      // setUserData(response.data)
      setUser(response.data)
      // userDetail = response.data
      console.log(response.data)
      router.push(`/users/${username}/repos`)
      // getUserRepos(username).then((response) => { // GET使用者的所有repositories
      //   router.push(`/users/${username}/repos`)
      //   setAllRepos(dispatch, response.data)
      //   console.log(response.data)
      // }).catch(input => {console.log(input.response)})
    }).catch(input => {console.log(input.response)})
  }, [username])

  return (
    <>
      {/* Header: Title, 搜尋框 */}
      <Flex bg='gray.800' h='8vh' color='white' px='9'>
        <Box py='5' fontWeight='bold' letterSpacing='0.1vw'>
          Intern Homework
        </Box>
        <Spacer />
        <Formik
            initialValues={{ name: 'jennyhuoh' }}
            onSubmit={(values, {setSubmitting}) => {
                if(values.name !== '') {
                    setTimeout(() => {
                      // getStaticProps(values.name)
                      // getStaticPaths(values.name)
                      setUsername(dispatch, values.name)
                      setSubmitting(false)
                      setAllRepos(dispatch, null)
                    }, 1000)
                } else {
                    alert('欄位不可空白送出哦。')
                    setSubmitting(false)
                }
            }}
        >
        {(props) => (
            <Form style={{display:'flex'}}>
                <Field name='name'>
                {({ field }) => (
                    <FormControl>
                        <Box py='3'>
                        <Input
                        {...field} 
                        id='name'
                        autoComplete='off' />
                        </Box>
                    </FormControl>
                )}
                </Field>
                <Box py='3' pl='1'>
                    <Button
                        borderRadius='0.4vw' 
                        border='1px solid white'
                        colorScheme='gray.800'
                        h='4.85vh'
                        isLoading={props.isSubmitting}
                        type='submit'
                    >
                        Search
                    </Button>
                </Box>
            </Form>
        )}
        </Formik>
      </Flex>
      {/* 使用者資料bar */}
      <Center bg='gray.50' h='17vh' borderBottom='0.1vw solid lightGray' fontWeight='bold' letterSpacing='0.05vw' fontSize='1.4vw'>
        <Grid
          h='18vh'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          pt='3'
        >
          <GridItem pt='3' pr='3' rowSpan={2} colSpan={1}><Avatar name='avatar' size='xl' src={user.avatar_url} /></GridItem>
          <GridItem pt='7' colSpan={2}>{user.login}'s Repositories</GridItem>
          <GridItem fontSize='sm' pt='2' colSpan={1}>followers: {user.followers}</GridItem>
          <GridItem fontSize='sm' pt='2' colSpan={1}>public_repos: {user.public_repos}</GridItem>
        </Grid>
      </Center>
      {/* repositories清單 */}
      <VStack spacing='5' mt='4'>
        {/* {
          repos ? repos.map((repository) => {
          return(
            <Box key={repository.id} w='35%' border='0.1vw solid lightGray' borderRadius='0.2vw'>
              <Stat h='16vh' p='4'>
              <Link 
                href="/users/[username]/repos/[repo]"
                as={`/users/${name}/repos/${repository.name}`}
              >
                <StatNumber color='blue.600'>{repository.name}</StatNumber>
              </Link>
                <StatLabel mt='2' color='gray.600'>created at : {repository.created_at}</StatLabel>
                <Flex mt='2'>
                  <StatHelpText>star : {repository.stargazers_count}</StatHelpText>
                  <Image ml='1.5' style={{width:'18px', height:'18px'}} alt='star' src='https://raw.githubusercontent.com/jennyhuoh/nextjs_practice/huoh/images/img-star.png' boxSize='50px' />
                </Flex>
              </Stat>
            </Box>
          )}) : // 若repository尚未載入則顯示spinner
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            mt='10vh'
          />
        } */}
      </VStack>
    </>
  )
}

export async function getStaticProps(){
  const response = await getUserDetail('jennyhuoh')
  const userDetail = await response.data
  const repos = await getUserRepos('jennyhuoh')
  return {
    props: {userDetail}
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      '/users/jennyhuoh/repos'
    ],
    fallback: true
  }
}