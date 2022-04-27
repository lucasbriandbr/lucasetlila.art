import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { users } from './constantes/users'
import ChatBox from './components/ChatBox'

//ajout des données de Lucas et Lila
import { db } from './src/firebase'
import {collection, addDoc, Timestamp, query, onSnapshot, updateDoc, doc} from '@firebase/firestore'

export default function Home() {

  const [Connected, setConnected] = useState(false)
  const [Clicked, setClicked] = useState(false)
  const [UserName, setUserName] = useState('')

  const [lucasState, setLucasState] = useState(false)
  const [lilaState, setLilaState] = useState(false)

  const [ error, setError ] = useState('')
  const [ success, setSuccess ] = useState('')

  //états des informations de Mlle.Pelissier

  const [ lilaAdress, setLilaAdress ] = useState('')
  const [ lilaTel, setLilaTel ] = useState('')
  const [ lilaLastConnexion, setLilaLastConnexion ] = useState('')

  //états des informations de Mr.Briand

  const [ lucasAdress, setLucasAdress ] = useState('')
  const [ lucasTel, setLucasTel ] = useState('')
  const [ lucasLastConnexion, setLucasLastConnexion ] = useState('')

  function openLucas() {
    setLucasState(!lucasState)
    setLilaState(false)
  }

  function openLila() {
    setLilaState(!lilaState)
    setLucasState(false)
  }

  useEffect(()=>{
    const q = query(collection(db, 'lila'))
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map(doc => (
        setLilaAdress(doc.get('adress')),
        setLilaTel(doc.get('tel')),
        setLilaLastConnexion(doc.get('lastconnexion'))
      ))
    })
    const r = query(collection(db, 'lucas'))
    onSnapshot(r, (querySnapshot) => {
      querySnapshot.docs.map(doc => (
        setLucasAdress(doc.get('adress')),
        setLucasTel(doc.get('tel')),
        setLucasLastConnexion(doc.get('lastconnexion'))
      ))
    })
  }, [])

  async function updateLastConnexion(userToUpdate) {
    if(userToUpdate==='Lila'){
      const washingtonRef = doc(db, "lila", "1");
      await updateDoc(washingtonRef, {
        lastconnexion: Timestamp.now().toDate().toUTCString()
      });
    }else{
      const washingtonRef = doc(db, "lucas", "1");
      await updateDoc(washingtonRef, {
        lastconnexion: Timestamp.now().toDate().toUTCString()
      });
    }
  }
  
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

        updateLastConnexion(user.name)
      
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
        
        {Connected===true&&UserName==='Lucas'||Connected===true&&UserName==='Lila'?
          <>

            <div className={`${styles.LilaInfos} ${!lilaState?styles.displayNone:''}`}>

              <p>{lilaAdress}</p>

              <p>{lilaTel}</p>
              
              <p>{lilaLastConnexion}</p>
          
            </div>
            
            <div className={`${styles.LucasInfos} ${!lucasState?styles.displayNone:''}`}>

              <p>{lucasAdress}</p>

              <p>{lucasTel}</p>
              
              <p>Last connexion : {lucasLastConnexion}</p>
            
            </div>
        
            <div className={styles.divDeBoutons}>
            
              <p className={styles.boutonContact} onClick={()=>openLila()}>Lila</p>

              <p className={styles.boutonContact} onClick={()=>openLucas()}>Lucas</p>
            
            </div>

          </>
        :
          ''
        }
        
        <div className={styles.header}>
          
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
