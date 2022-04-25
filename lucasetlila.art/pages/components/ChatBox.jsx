import styles from '../../styles/Chat.module.css'
import { useState, useEffect } from 'react'

export default function ChatBox(props) {

    const [ error, setError ] = useState()
    const [ success, setSuccess ] = useState()

    async function signMessage(message) {
        
        try {

            const encodedMessage = new TextEncoder().encode(message)
        
            const signedMessage = await window.solana.signMessage(encodedMessage, "utf8")

            setSuccess('the user accepts the request')

            setError('')

        } catch(err) {
            
            setError('the user rejected the request')

            setSuccess('')

        }
        
    }

    return (

        <div className={styles.ChatBox}>
    
            <p className={styles.infoConnection}>Hi and Welcome {props.name} ;)</p>

            <button onClick={() => signMessage('je suis un trou de balle')}>Envoyer</button>

            {error!==''?<p className={styles.infoError}>{error}</p>:''}

            {success!==''?<p className={styles.infoSuccess}>{success}</p>:''}
        
        </div>
        
    )

}