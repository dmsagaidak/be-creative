import React from 'react';
import {Card, Typography} from "@mui/material";
import { ChatMessage } from '../../../types';

interface Props {
  message: ChatMessage
}

const MessageItem: React.FC<Props> = ({message}) => {
  return (
    <Card sx={{ mb: 1 }}>
      <Typography component="p">{message.username} writes:</Typography>
      <Typography component="p">{message.text}</Typography>
    </Card>
  );
};

export default MessageItem;