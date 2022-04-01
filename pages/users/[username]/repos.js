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
import { ArrowUpIcon } from '@chakra-ui/icons'
import { Formik, Field, Form } from 'formik'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { StoreContext } from '../../../store'
import { setUsername, setAllRepos, removeAllRepos } from '../../../actions'
import { getUserRepos, getUserDetail } from '../../api/index'

export default function Repos({userDetail}) {
  const { state : { username, allRepos : { items } } , dispatch } = useContext(StoreContext)
  const [user, setUser] = useState(userDetail)
  const [page, setPage] = useState(1)
  const [displayOver, setDisplayOver] = useState(false)
  const [showArrow, setShowArrow] = useState(false)
  const [avatarURL, setAvatarURL] = useState(null)
  const router = useRouter()
  const listenScrollEvent = () => {
    window.scrollY > 100 ? setShowArrow(true) : setShowArrow(false)
  }

  // 重新進入頁面時重新載入user的repositories
  useEffect(() => {
    removeAllRepos(dispatch, [])
    setDisplayOver(false)
    setPage(1)
  }, [])

  // 監聽畫面滑動位置控制是否顯示置頂按鈕
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent)
  }, [showArrow])
    
  // 監聽頁面滑到底部page+1 => 觸發下方useEffect讀取新的十個repositories
  useEffect(() => {
      window.onscroll = function(){
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        console.log('bottom!')
        if(displayOver === false){
          setPage(page => page+1)
        }
      }
    }
  }, [displayOver])

  // 1. 當page變數改變時接api讀取新十個repositories 2. 當user的repository總數讀取完成，透過displayOver設斷點
  useEffect(() => {
    let isMounted = true
    if(isMounted){
      if(!displayOver){
        getUserRepos(username, page).then((response) => {
          setAllRepos(dispatch, response.data)
        }).catch(input => {console.log(input.response)})
      }
      if(user && (items.length === user.public_repos)){
        setDisplayOver(true)
      }
    }
    console.log(page)
    console.log(items.length)
    return () => {isMounted = false}
  }, [page, username])

  // GET使用者資料，包含圖片、followers人數以及公開的repositories數量
  useEffect(() => {
    let isMounted = true
    getUserDetail(username).then((response) => {  
      if(isMounted){
        setUser(response.data)
        router.push(`/users/${username}/repos`)
      }
    }).catch(input => {console.log(input.response)})
    return () => {isMounted = false}
  }, [username])

  // 當user存在時才把avatar_url放進Image的src當中
  useEffect(() => {
    if(user){
      setAvatarURL(user.avatar_url)
    }
  }, [user])

  return (
    <>
      {
        // 當showArrow為true，顯示置頂按鈕
        showArrow ?
        <Box w='12' h='12' style={{position:'fixed', right:'0', bottom:'0', cursor:'pointer'}} onClick={() => window.scrollTo(0, 0)}>
          <Box w='9' h='9' bg='gray.800' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <ArrowUpIcon w='7' h='7' color='white' />
          </Box>
        </Box> : ""
      }
      {/* Header: Title, 搜尋框 */}
      <Flex bg='gray.800' h='8vh' color='white' px='9'>
        <Link href="/">
          <Box cursor='pointer' py='5' fontWeight='bold' letterSpacing='0.1vw'>
            Intern Homework
          </Box>
        </Link>
        <Spacer />
        <Formik
            initialValues={{ name: username }}
            onSubmit={(values, {setSubmitting}) => {
                if(values.name !== '') {
                    setTimeout(() => {
                      setUsername(dispatch, values.name)
                      setSubmitting(false)
                      removeAllRepos(dispatch, [])
                      setDisplayOver(false)
                      setPage(1)
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
        {
          user ? 
          <Grid
            h='18vh'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(3, 1fr)'
            pt='3'
          >
            <GridItem pt='3' pr='3' rowSpan={2} colSpan={1}><Avatar name={avatar} size='xl' src={avatarURL} /></GridItem>
            <GridItem pt='7' colSpan={2}>{`${user.login}'s Repositories`}</GridItem>
            <GridItem fontSize='sm' pt='2' colSpan={1}>followers: {user.followers}</GridItem>
            <GridItem fontSize='sm' pt='2' colSpan={1}>public_repos: {user.public_repos}</GridItem>
          </Grid> : 
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
      {/* repositories清單 */}
      <VStack spacing='5' mt='4' mb='1'>
        {
          items.length>=1 ? items.map((repository) => {
          return(
            <Box key={repository.id} w='35%' border='0.1vw solid lightGray' borderRadius='0.2vw'>
              <Stat h='16vh' p='4'>
              <Link 
                href="/users/[username]/repos/[repo]"
                as={`/users/${username}/repos/${repository.name}`}
              >
                <StatNumber cursor='pointer' color='blue.600'>{repository.name}</StatNumber>
              </Link>
                <StatLabel mt='2' color='gray.600'>created at : {repository.created_at}</StatLabel>
                <Flex mt='2'>
                  <StatHelpText>star : {repository.stargazers_count}</StatHelpText>

                  <Image ml='1.5' style={{width:'18px', height:'18px'}} alt='star' src='https://raw.githubusercontent.com/jennyhuoh/nextjs_practice/huoh/public/images/img-star.png' boxSize='50px' />
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
        }
      </VStack>
      {
        // displayOver為true時顯示讀取完成文字
        displayOver ? <Center mt='7' mb='8'>沒有其他 repository 囉</Center> : ""
      }
      
    </>
  )
}

export async function getStaticProps(){
  const response = await getUserDetail('jennyhuoh')
  const userDetail = await response.data
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