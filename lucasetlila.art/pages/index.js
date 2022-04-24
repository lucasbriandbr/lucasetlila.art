import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {

  const [connected, setConnected] = useState(false)

  return ( 

    <>

      <Head>

        <title>Monument à tous ces instants de bonheur, pour se retrouver toujours :(</title>

        <meta name="description" content="Pour se garder jusqu'à la fin" />

        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div className={styles.container}>
        
        <div className={styles.header}>

          <h3>Pour se retrouver toujours</h3>
          
          {connected === true ?

            <div className={styles.messagerieWidget}>

              <p>messagerie</p>

            </div>

          :

            <div className={styles.connectWidget}>

              <p>Connection</p>

            </div>

          }

        </div>

      </div>

    </>

  )

}
