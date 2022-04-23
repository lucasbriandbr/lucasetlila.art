import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  return ( 

    <>

      <Head>

        <title>Ce lien incassable</title>

        <meta name="description" content="Pour se garder jusqu'à la fin" />

        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div className={styles.container}>
        
        <div className={styles.header}>

          <p>cacaboudin</p>

        </div>

      </div>

    </>

  )

}
