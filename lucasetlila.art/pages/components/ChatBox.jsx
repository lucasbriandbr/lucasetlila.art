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

        } catch(err) {
            
            setError('the user rejected the request')

        }
        
    }

    return (

        <div className={styles.ChatBox}>
    
            <p className={styles.infoConnection}>Hi and Welcome {props.name} ;)</p>

            <button onClick={() => signMessage('je suis un trou de balle')}>Coucou toi</button>
        
        </div>
        
    )

}