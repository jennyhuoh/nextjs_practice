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
         FormControl
         } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';

export default function Repos() {
    
  return (
    <>
      <Flex bg='gray.800' h='8vh' color='white' px='9'>
        <Box py='5' fontWeight='bold' letterSpacing='0.1vw'>
          Intern Homework
        </Box>
        <Spacer />
        <Formik
            initialValues={{ name: '' }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
                }, 1000)
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
                        Submit
                    </Button>
                </Box>
            </Form>
        )}
        </Formik>
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
