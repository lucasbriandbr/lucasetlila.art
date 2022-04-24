export default function detectProvider() {
        
    if ("solana" in window) {
        const provider = window.solana
        if (provider.isPhantom) {
            console.log(provider)
            return provider
        }
    }
    window.open("https://phantom.app/", "_blank")

}