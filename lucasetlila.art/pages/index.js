import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  return ( 

    <>

      <Head>

        <title>Monument à tous ces instants de bonheur, pour se retrouver toujours</title>

        <meta name="description" content="Pour se garder jusqu'à la fin" />

        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div className={styles.container}>
        
        <div className={styles.header}>

          <h2>Pour se retrouver toujours</h2>

        </div>

      </div>

    </>

  )

}
