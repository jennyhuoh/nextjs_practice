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
         GridItem
         } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../../../store'
import { setUsername } from '../../../actions'
import { getUserRepos, getUserDetail } from '../../api/index'
export default function Repos() {
  const { state: {username} , dispatch} = useContext(StoreContext)
  const [avatar, setAvatar] = useState('')
  const [userFollowers, setUserFollowers] = useState('')
  const [repoSum, setRepoSum] = useState('')
  const router = useRouter()

  useEffect(() => {
    getUserDetail(username).then((response) => {
      console.log(response.data)
      setAvatar(response.data.avatar_url)
      setUserFollowers(response.data.followers)
      setRepoSum(response.data.public_repos)
      getUserRepos(username).then((response) => {
        console.log(response.data)
        router.push(`/users/${username}/repos`)
      }).catch(input => {console.log(input.response)})
    }).catch(input => {console.log(input.response)})
      
  }, [username])
  return (
    <>
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
      <Center bg='gray.50' h='17vh' borderBottom='0.1vw solid lightGray' fontWeight='bold' letterSpacing='0.05vw' fontSize='1.4vw'>
        <Grid
          h='18vh'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          // gap={4}
          pt='3'
        >
          <GridItem p='3' rowSpan={2} colSpan={1}><Avatar name='avatar' size='xl' src={avatar} /></GridItem>
          <GridItem pt='7' colSpan={2}>{username}'s Repositories</GridItem>
          <GridItem fontSize='sm' pt='2' colSpan={1}>followers: {userFollowers}</GridItem>
          <GridItem fontSize='sm' pt='2' colSpan={1}>public_repos: {repoSum}</GridItem>
        </Grid>
        
        {/* <img alt='avatar' src={avatar}/> */}
        
      </Center>
      <VStack spacing='5' mt='4'>
        <Box w='46%' border='0.1vw solid lightGray' borderRadius='0.2vw'>
          <Stat h='17vh' p='4'>
            <StatNumber color='blue.600'>octokit.js</StatNumber>
            <StatLabel color='gray.600'>The all-batteries-included GitHub SDK for Browsers, Node.js, and Deno.</StatLabel>
            <StatHelpText mt='4'>star:5315</StatHelpText>
          </Stat>
        </Box>
      </VStack>
    </>
  )
}

