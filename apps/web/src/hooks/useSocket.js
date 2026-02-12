import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8080";

const useSocket = (onMessage) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
        }

        if(onMessage){
            ws.onmessage = onMessage;
        }

        ws.onclose = () => {
            setSocket(null);
        }

        return () => {
            ws.close();
        }
    }, [onMessage]);
    
    return socket;
}

export {
    useSocket
}