// import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from '../store'

export default function MyApp({ Component, pageProps }) {
  return(
    <StoreProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
    
  )
}