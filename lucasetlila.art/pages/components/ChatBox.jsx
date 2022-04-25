import styles from '../../styles/Chat.module.css'
import { useState, useEffect } from 'react'

export default function ChatBox(props) {

    const [ error, setError ] = useState()
    const [ success, setSuccess ] = useState()
    const [ theTimeout, setTheTimeout ] = useState(false)
    const [ message, setMessage ] = useState('')

    async function signMessage(message) {
        
        try {

            const encodedMessage = new TextEncoder().encode(message)
        
            const signedMessage = await window.solana.signMessage(encodedMessage, "utf8")

            setSuccess('Your message has been sent successfully, please wait')
            
            setTheTimeout(true)

            setError('')
            
            let successTimeout = setTimeout(() => {setSuccess(''), setTheTimeout(false)}, 3500)

        } catch(err) {
            
            setError('An error has occured, please retry, please wait')
            
            setTheTimeout(true)

            setSuccess('')
            
            let errorTimeout = setTimeout(() => {setError(''), setTheTimeout(false)}, 3500)

        }
        
    }

    return (

        <div className={styles.ChatBox}>

            <div className={styles.render}></div>
            
            <div className={styles.inputAndSendButton}>

                <input className={styles.messageInput} type="text" id="name" name="name" required placeholder={'Type a message, '+props.name}/>
                
                <button className={styles.sendingButton} onClick={() => {setMessage(document.getElementById('name').value), signMessage(document.getElementById('name').value)}} disabled={theTimeout}>Send</button>

            </div>

            {/* {error!==''?<div><p className={styles.infoError}>{error}</p></div>:''}

            {success!==''?<div><p className={styles.infoSuccess}>{success}</p></div>:''} */}
        
        </div>
        
    )

}