import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, IncomingMessage } from '../../types';
import { Container, Grid } from '@mui/material';
import MessageItem from './components/MessageItem';
import ChatForm from './components/ChatForm';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useAppSelector(selectUser);
  const ws = useRef<null | WebSocket>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onclose = () => console.log('ws closed');

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;

      if (user && decodedMessage.type === 'NEW_MESSAGE') {
        setMessages((prev) => [
          ...prev,
          {
            text: decodedMessage.payload.text,
            username: decodedMessage.payload.username,
            datetime: new Date().toISOString()
          },
        ]);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleLogin = () => {
    if (!ws.current) return;
    ws.current.onopen = () => {
      console.log('Websocket is open');
      ws.current?.send(
        JSON.stringify({
          type: 'LOGIN',
          payload: user?.token,
        })
      );
      setIsLoggedIn(true);
    }

  };

  useEffect(() => {
    if (user) {
      handleLogin();
    }
  }, [user]);

  const handleSendMessage = (messageText: string) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: messageText,
        username: user?.displayName,
      })
    );
  };

  return (
    <Container>
      <Grid container direction='column'>
        {messages.map((message, idx) => (
          <Grid item xs key={idx}>
            <MessageItem message={message}/>
          </Grid>
        ))}
        <Grid item xs sx={{mt: 3}}>
          <ChatForm sendMessage={handleSendMessage} />
        </Grid>
      </Grid>
    </Container>
  )
};

export default Chat;