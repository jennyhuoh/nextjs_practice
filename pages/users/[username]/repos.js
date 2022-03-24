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
         Image
         } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../../../store'
import { setUsername } from '../../../actions'
import { getUserRepos, getUserDetail } from '../../api/index'
// import star from '../../../images/img-star.png'

export default function Repos() {
  const { state: {username} , dispatch} = useContext(StoreContext)
  const [avatar_url, setAvatar] = useState('')
  const [followers, setUserFollowers] = useState('')
  const [public_repos, setRepoSum] = useState('')
  const [allRepos, setAllRepos] = useState(null)
  const [displayedRepos, setDisplayedRepos] = useState([])
  const router = useRouter()

  useEffect(() => {
    getUserDetail(username).then((response) => {  // GET使用者資料，包含圖片、followers人數以及公開的repositories數量
      setUserData(response.data)
      getUserRepos(username).then((response) => { // GET使用者的所有repositories
        router.push(`/users/${username}/repos`)
        setAllRepos(response.data)
        console.log(response.data)
      }).catch(input => {console.log(input.response)})
    }).catch(input => {console.log(input.response)})
  }, [username])

  const setUserData = ({
    avatar_url, 
    followers, 
    public_repos
  }) => {
    setAvatar(avatar_url)
    setUserFollowers(followers)
    setRepoSum(public_repos)
  }

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
                      setUsername(dispatch, values.name)
                      setSubmitting(false)
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
          // gap={4}
          pt='3'
        >
          <GridItem p='3' rowSpan={2} colSpan={1}><Avatar name='avatar' size='xl' src={avatar_url} /></GridItem>
          <GridItem pt='7' colSpan={2}>{username}'s Repositories</GridItem>
          <GridItem fontSize='sm' pt='2' colSpan={1}>followers: {followers}</GridItem>
          <GridItem fontSize='sm' pt='2' colSpan={1}>public_repos: {public_repos}</GridItem>
        </Grid>
      </Center>
      {/* repositories清單 */}
      <VStack spacing='5' mt='4'>
        {
          allRepos ? allRepos.map((repo) => {
          return(
            <Box key={repo.id} w='46%' border='0.1vw solid lightGray' borderRadius='0.2vw'>
              <Stat h='16vh' p='4'>
                <StatNumber color='blue.600'>{repo.name}</StatNumber>
                <StatLabel mt='2' color='gray.600'>created at : {repo.created_at}</StatLabel>
                <StatHelpText mt='2'>star : {repo.stargazers_count}</StatHelpText>
              </Stat>
            </Box>
          )
            
            
          }) : "hi"
        }
      </VStack>
    </>
  )
}

