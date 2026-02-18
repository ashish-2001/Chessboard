import { useEffect, useRef } from "react";
import { WEBRCT_ANSWER, WEBRTC_ICE, WEBRTC_OFFER } from "../../../backend1/src/messages";
import { Button } from "./Button";

function VideoCall({ socket }){
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerRef = useRef(null);


    useEffect(() => {
        if(!socket){
            return;
        }

        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.1.google.com:19302" }]
        });

        peerRef.current = peer;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            localVideo.current.srcObject = stream;
            stream.getTracks().forEach(track => peer.addTrack(track, stream))
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
        }

        socket.onmessage = async event => {
            const msg = JSON.parse(event.data);

            if(msg.type === WEBRTC_OFFER){
                await peer.setRemoteDescription(msg.payload);
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                socket.send(
                    JSON.stringify({
                        type: WEBRCT_ANSWER,
                        payload: answer
                    })
                )
            }

            if(msg.type === WEBRCT_ANSWER){
                await peer.setRemoteDescription(msg.payload);
            }

            if(msg.type === WEBRTC_ICE){
                await peer.addIceCandidate(msg.payload);
            }
        }

        return () => peer.close();
    }, [socket]);

    const startCall = async () => {
        const offer= await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socket.send(
            JSON.stringify({
                type: WEBRTC_OFFER,
                payload: offer
            })
        )
    }

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
            <Button onClick={startCall}>
                Video Call
            </Button>
        </div>
    )
}

export {
    VideoCall
}