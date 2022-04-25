import whoIsTheConnectedGuy from './whoistheconnectedguy'

export default async function detectProvider() {

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

            } else {

                return false

            }

        } else {
            
            return false

        }

    } else {

        return false

    }

}