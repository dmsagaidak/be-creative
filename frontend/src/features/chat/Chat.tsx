import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, IncomingMessage } from '../../types';
import { Container, Grid } from '@mui/material';
import MessageItem from './components/MessageItem';
import ChatForm from './components/ChatForm';


const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const ws = useRef<null | WebSocket>(null);


  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onclose = () => console.log('ws closed');

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;

      if (decodedMessage.type === 'NEW_MESSAGE') {
        setMessages((prev) => [...prev, decodedMessage.payload]);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);


  const handleSendMessage = (messageText: string) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: messageText,
      })
    );
  };


  return (
    <Container>
      <Grid container xs direction='column'>
        {messages.map((message, idx) => (
          <Grid item xs>
            <MessageItem key={idx} message={message}/>
          </Grid>
        ))}
        <Grid item>
          <ChatForm sendMessage={handleSendMessage} />
        </Grid>
      </Grid>
    </Container>
  )
};

export default Chat;