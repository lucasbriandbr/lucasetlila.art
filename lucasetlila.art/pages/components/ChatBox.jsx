import styles from '../../styles/Chat.module.css'
import { useState, useEffect } from 'react'
import { db } from '../src/firebase'
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore'

export default function ChatBox(props) {

    const [openAddModal, setOpenAddModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [ nameBro, setNameBro ] = useState(props.name)

    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    const [ theTimeout, setTheTimeout ] = useState(false)

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('date', 'asc'))
        onSnapshot(q, (querySnapshot) => {
          setTasks(querySnapshot.docs.map(doc => (
             
            <div key={doc.get('date')} className={styles.sectionMessage}>
                
                <div className={(nameBro===doc.get('sender'))?`${styles.youSendIt}`:`${styles.youDontSendIt}`}>

                    <p>{doc.get('text')}</p>

                    <p className={styles.paragrapheInfoDate}>{doc.get('sender')}, {doc.get('date').toDate().toUTCString()}</p>

                </div>

            </div>

          )))
        })
        // document.getElementById(`${styles.render}`).lastChild.focus()
    },[])
    
    const handleSubmit = async (e) => {

        try {

            await addDoc(collection(db, 'messages'), {
                text: document.getElementById('name').value,
                sender: nameBro,
                date: Timestamp.now()
            })

        } catch (err) {

            alert(err)

        }

    }

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
                
                handleSubmit()
    
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

            <div className={styles.render} id={styles.render}>

                {error!==''?<div className={styles.errorContainer}><p className={styles.infoError}>{error}</p></div>:''}

                {success!==''?<div className={styles.successContainer}><p className={styles.infoSuccess}>{success}</p></div>:''}

                {tasks}
            
            </div>
            
            <div className={styles.inputAndSendButton}>

                <input className={styles.messageInput} type="text" id="name" name="name" required placeholder={'Type a message, '+nameBro}/>
                
                <button className={ `${styles.sendingButton} ${theTimeout? `${styles.disabled}`:`` }` } onClick={() => {(document.getElementById('name').value), signMessage(document.getElementById('name').value)}} disabled={theTimeout}>Send</button>

            </div>
        
        </div>
        
    )

}