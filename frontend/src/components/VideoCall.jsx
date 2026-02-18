import { useEffect, useRef } from "react";
import { WEBRTC_ANSWER, WEBRTC_ICE, WEBRTC_OFFER } from "../../../backend1/src/messages";

function VideoCall({ socket }){
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerRef = useRef(null);
    const streamRef = useRef(null);


    useEffect(() => {

        if(!socket || !enabled) return;

        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.1.google.com:19302" }]
        });

        peerRef.current = peer;

        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(stream => {
            streamRef.current = stream;
            localVideo.current.srcObject = stream;
            stream.getTracks().forEach(track => 
                peer.addTrack(track, stream))
        });

        peer.ontrack = e => {
            remoteVideo.current.srcObject = e.streams[0];
        };

        peer.onicecandidate = e => {
            if(e.candidate){
                socket.send(
                    JSON.stringify({
                        type: WEBRTC_ICE,
                        payload: e.candidate
                    })
                )
            }
        };

        const handleMessage = async event => {
            const msg = JSON.parse(event.data);

            if(msg.type === WEBRTC_OFFER){
                await peer.setRemoteDescription(msg.payload);
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                socket.send(JSON.stringify({
                    type: WEBRTC_ANSWER,
                    payload: answer
                }));
            }

            if(msg.type === WEBRTC_ANSWER){
                await peer.setRemoteDescription(msg.payload);
            }

            if(msg.type === WEBRTC_ICE){
                await peer.addIceCandidate(msg.payload);
            }
        };

        socket.addEventListener("message", handleMessage);

        if(enabled === "caller"){
            peer.createOffer()
            .then(offer => {
                peer.setLocalDescription(offer);
                socket.send(
                    JSON.stringify({
                        type: WEBRTC_OFFER,
                        payload: offer
                    })
                );
            });
        }

        return () => {
            socket.removeEventListener("message", handleMessage);
            peer.close();
            streamRef.current?.getTracks().forEach(t => t.stop())
        }
    }, [socket]);

    return (
        <div className="flex flex-col gap-2 w-[200px]">
            <div className="flex">
                <div className="rounded-full">
                    <video ref={localVideo} autoPlay muted className="w-30  rounded-full"/>
                </div>
                <div className="rounded-full">
                    <video ref={remoteVideo} autoPlay className="w-20 rounded-full"/>
                </div>
            </div>
        </div>
    )
}

export {
    VideoCall
}