import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useCount} from '../context/Control'

export default function Home(props) {
  
  const str = props.host.split('.')

  console.log(str)
  
  const { count } = useCount();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      teste 
      




      
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const host = context.req.headers.host

  return {
    props: {
      host
    }
  }
}