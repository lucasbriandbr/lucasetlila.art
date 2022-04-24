export default async function detectProvider() {

    if (typeof window !== 'undefined') {
        
        if ("solana" in window) {

            const provider = window.solana

            if (provider.isPhantom) {
                
                try {

                    const resp = await window.solana.connect()

                    return(true)
                    
                } catch (err) {

                    // { code: 4001, message: 'User rejected the request.' }

                    return(false)

                }

            }

        } else {
            
            return false

        }

    } else {

        console.error('You are on the server')

    }

}