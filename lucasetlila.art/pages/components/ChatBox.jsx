import styles from '../../styles/Chat.module.css'
import { useState, useEffect } from 'react'

export default function ChatBox(props) {

    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    const [ theTimeout, setTheTimeout ] = useState(false)
    const [ message, setMessage ] = useState('')

    async function signMessage(message) {
        
        if (message==='') {
                
            setError("You can't send an empty message, please wait")
            
            setTheTimeout(true)

            setSuccess('')
            
            let errorTimeout = setTimeout(() => {setError(''), setTheTimeout(false)}, 3500)

        } else {
        
            try {
    
                const encodedMessage = new TextEncoder().encode(message)
            
                const signedMessage = await window.solana.signMessage(encodedMessage, "utf8")
    
                setSuccess('Your message has been sent successfully, please wait')
                
                setTheTimeout(true)
    
                setError('')
    
                document.getElementById('name').value=""
                
                let successTimeout = setTimeout(() => {setSuccess(''), setTheTimeout(false)}, 3500)
    
            } catch(err) {
                
                setError('An error has occured, please retry, please wait')
                
                setTheTimeout(true)
    
                setSuccess('')
                
                let errorTimeout = setTimeout(() => {setError(''), setTheTimeout(false)}, 3500)
    
            }

        }
        
    }

    return (

        <div className={styles.ChatBox}>

            <div className={styles.render}>

                {error!==''?<div className={styles.errorContainer}><p className={styles.infoError}>{error}</p></div>:''}

                {success!==''?<div className={styles.successContainer}><p className={styles.infoSuccess}>{success}</p></div>:''}
            
            </div>
            
            <div className={styles.inputAndSendButton}>

                <input className={styles.messageInput} type="text" id="name" name="name" required placeholder={'Type a message, '+props.name}/>
                
                <button className={ `${styles.sendingButton} ${theTimeout? `${styles.disabled}`:`` }` } onClick={() => {setMessage(document.getElementById('name').value), signMessage(document.getElementById('name').value)}} disabled={theTimeout}>Send</button>

            </div>
        
        </div>
        
    )

}