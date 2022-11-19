import { useState, useEffect } from "react"
import ReactDom from 'react-dom'
const Portal= ({ children }) => {
    const [mounted, setMounted] = useState(false)
 
    useEffect(() => {
       setMounted(true)
 
       return () => setMounted(false)
    }, [])
 
    return mounted
       ? ReactDom.createPortal(children, 
         document.querySelector("#modal-root"))
       : null
 }
 
 export default Portal