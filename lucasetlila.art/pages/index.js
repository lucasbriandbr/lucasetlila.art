import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { users } from './constantes/users'

export default function Home() {

  const [Connected, setConnected] = useState(false)
  const [Clicked, setClicked] = useState(false)
  const [UserName, setUserName] = useState('')
  
  async function detectProvider() {
    
    if (typeof window !== 'undefined') {
      
      if ("solana" in window) {
        
        const provider = window.solana
        
        if (provider.isPhantom) {

          try {

            const resp = await window.solana.connect()
          
            window.solana.on("connect", () => {
              
              let publicKey = resp.publicKey.toString()
            
              whoIsTheConnectedGuy(publicKey)

              console.log(UserName)
            
            })

            setClicked(true)

          } catch (err) {

          }
        
        }

      }

    }

  }
  
  function whoIsTheConnectedGuy(walletPubKey) {
    
    users.find((user) => {
      
      if (walletPubKey === user.adress) {
        
        setUserName(user.name)
      
      }
    
    })

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
          
          {Connected === true ?

            <div className={styles.messagerieWidget}>

              <p>Messagerie Active</p>

            </div>

          :

            <div className={styles.connectWidget}>

              <button className={styles.connectButton} onClick={() => (detectProvider())}>{Clicked===true?"Click to load the chat":"Click to load your provider"}</button>
              
              <p className={styles.infoConnection}>Your configuration should be : Phantom Wallet, Solana Network, authentication with the 12 words seed phrase you wrote on a piece of paper.</p>

              {UserName !== "" ?<p className={styles.infoConnection}>Hi and Welcome {UserName} ;)</p>:''}

            </div>

          }

        </div>

      </div>

    </>

  )

}
