import { useEffect, useRef } from "react";
import { 
    WEBRTC_ANSWER, 
    WEBRTC_ICE, 
    WEBRTC_OFFER 
} from "../../../backend1/src/messages";

function VideoCall({ socket, role, signal }){
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerRef = useRef(null);
    const pendingIce = useRef([]);

    useEffect(() => {

        if( !socket || !role) return;

        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.1.google.com:19302" }]
        });

        peerRef.current = peer;

        peer.ontrack = (e) => {
            remoteVideo.current.srcObject = e.streams[0];
        };

        peer.onicecandidate = (e)=> {
            if(e.candidate){
                socket.send(JSON.stringify({
                    type: WEBRTC_ICE,
                    payload: e.candidate
                }));
            }
        };

        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localVideo.current.srcObject = stream;
            stream.getTracks().forEach(track => peer.addTrack(track, stream));
        })
        .then(async () => {
            if(role === "caller"){
                const offer = await peer.createOffer();
                await peer.setLocalDescription(offer);
                socket.send(JSON.stringify({
                    type: WEBRTC_OFFER,
                    payload: offer
                }));
            }
        });

        return () => peer.close();
}, [socket, role]);

useEffect(() => {
    if(!signal || !peerRef.current) return;

    const peer = peerRef.current;

    (async () => {
        if(signal.type === WEBRTC_OFFER){
            await peer.setRemoteDescription(signal.payload);

            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            socket.send(JSON.stringify({
                type: WEBRTC_ANSWER,
                payload: answer
            }))

            for(const ice of pendingIce.current){
                await peer.addIceCandidate(ice);
            }

            pendingIce.current = [];
        }

        if(signal.type === WEBRTC_ANSWER){
            await peer.setRemoteDescription(signal.payload);

            for(const ice of pendingIce.current){
                await peer.addIceCandidate(ice);
            }
            pendingIce.current = [];
        }

        if(signal.type === WEBRTC_ICE){
            if(peer.remoteDescription){
                await peer.addIceCandidate(signal.payload);
            } else {
                pendingIce.current.push(signal.payload);
            }
        }
    })();
}, [signal, socket])

return (
        <div className="flex flex-col gap-2 w-[200px]">
            <div className="flex">
                <div className="rounded-full">
                    
                    <video ref={localVideo} autoPlay muted playsInline className="w-30 rounded-full"/>
                </div>
                <div className="rounded-full">
                    <video ref={remoteVideo} autoPlay playsInline className="w-20 rounded-full"/>
                </div>
            </div>
        </div>
    )
}

export {
    VideoCall
}