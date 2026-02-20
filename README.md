Real-Time multiplayer chess with video call

A "real time multiplayer chess application" where "two players can play chess together" and
"communicate vialive video and audio calls".

## Features

Chess

- Real-Time chess gameplay
- Valid move enforcement using chess rules
- Live board synchronization between players
- Automatic game state updates

Real-Time Communication(WebSocket)
- Player matchmaking
- Move synchronization in real time
- Game eventshandling (start, move, game over)

Video & Audio Call(WebRTC)
- Peer-to-peer video calling between players
- Audio and video permission handling
- ICE candidates exchange
- SDP offer/answer signaling
- Real-Time camera & microphone streaming


How it works

1. Two players connect to the server using "WebSockets"
2. Server pairs players into a game room
3. Chess moves are sent via WebSocket messages
4. When both players allow camera & mic:
  - WwebRTC signaling starts
  - Offer, Answer, and ICE candidates are exchanged via WebSocket
5. Players establish a "direct peer-to-peer video call"

Tech-Stack

- React.js
- WebRTC
- Chess.js
- HTML5, css3, Javascript
- Node.js
- WebSocket

Permissions required
- Camera access(video call)
- Microphone access(audio call)
