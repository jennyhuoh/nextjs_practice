import Head from 'next/head'
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../store'

export default function Home() {
  const { state: { username }} = useContext(StoreContext)
  const router= useRouter()
  useEffect(() => {
    router.push(`/users/${username}/repos`)
  }, [])
  return (
    <>
      <Head>
        <title>Github Rest Api</title>
      </Head>
    </>
  )
}
