export default function detectProvider() {

    if (typeof window !== 'undefined') {
        console.log('You are on the browser')
        // ✅ Can use window here
    } else {
        console.log('You are on the server')
        // ⛔️ Don't use window here
    }
        
    // if ("solana" in window) {
    //     const provider = window.solana
    //     if (provider.isPhantom) {
    //         console.log(provider)
    //         return provider
    //     }
    // } else {
    //     window.open("https://phantom.app/", "_blank")
    // }

}