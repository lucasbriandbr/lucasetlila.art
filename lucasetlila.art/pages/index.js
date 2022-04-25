import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import whoIsTheConnectedGuy from './components/whoistheconnectedguy'

export default function Home() {

  const [connected, setConnected] = useState(false)
  
  function detectProvider() {
    
    if (typeof window !== 'undefined') {
      
      if ("solana" in window) {
        
        const provider = window.solana
        
        if (provider.isPhantom) {
          
          // const resp = await window.solana.connect()
          
          // window.solana.on("connect", () => {
            
          //     let publicKey = resp.publicKey.toString()
          
          //     whoIsTheConnectedGuy(publicKey)
          
          //     console.log(true)
          
          // })
        
        }

      }

    }

  }

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

              <p>Messagerie Active</p>

            </div>

          :

            <div className={styles.connectWidget}>

              <button className={styles.connectButton} onClick={() => (console.log('here we go'))}>Double click to load the chat</button>
              
              <p className={styles.infoConnection}>Your configuration should be : Phantom Wallet, Solana Network, authentication with the 12 words seed phrase you wrote on a piece of paper;</p>

            </div>

          }

        </div>

      </div>

    </>

  )

}
