
import { Box, Input, Flex, Spacer, Button, Center, Stat, StatLabel, StatNumber, StatHelpText, VStack } from '@chakra-ui/react'

export default function Repos() {
  return (
    <>
      <Flex bg='gray.800' h='8vh' color='white' px='9'>
        <Box py='5' fontWeight='bold' letterSpacing='0.1vw'>
          Intern Homework
        </Box>
        <Spacer />
        <Box py='4'>
          <Input placeholder='Search user' size='sm' />
        </Box>
        <Box py='4'>
          <Button borderRadius='0.1vw' border='0.1vw solid white' colorScheme='gray.800' borderLeft='none' size='sm'>
            Search
          </Button>
        </Box>
      </Flex>
      <Center bg='gray.50' h='10vh' borderBottom='0.1vw solid lightGray' fontWeight='bold' letterSpacing='0.05vw' fontSize='1.4vw'>
        jennyhuoh's Repositories
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
