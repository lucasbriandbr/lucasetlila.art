import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { users } from './constantes/users'
import ChatBox from './components/ChatBox'

export default function Home() {

  const [Connected, setConnected] = useState(false)
  const [Clicked, setClicked] = useState(false)
  const [UserName, setUserName] = useState('')

  const [ error, setError ] = useState('')
  const [ success, setSuccess ] = useState('')
  
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
            
            })

            setClicked(true)

          } catch(err) {

          }
        
        }

      }

    }

  }
  
  function whoIsTheConnectedGuy(walletPubKey) {
    
    users.find((user) => {
      
      if (walletPubKey === user.adress) {

        setConnected(true)
        
        setUserName(user.name)
      
      } else {

        setError('You are not Lucas or Lila')

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

          {/* <h3>Pour se retrouver toujours</h3> */}
          
          {Connected === true ?

            <div className={styles.messagerieWidget}>

            {UserName !== "" ?<ChatBox name={UserName}/>:''}

            </div>

          :

            <div className={styles.connectWidget}>

              <button className={styles.connectButton} onClick={() => (detectProvider())}>{Clicked===true?"Click to load the chat":"Click to load your provider"}</button>
              
              <p className={styles.infoConnection}>Your configuration should be : Phantom Wallet desktop navigator extension (Chrome, Brave, Siri,...), Solana Network, authentication with the 12 words seed phrase you wrote on a piece of paper.</p>

              {error!==''?<p className={styles.infoError}>{error}</p>:''}

            </div>

          }

        </div>

      </div>

    </>

  )

}
