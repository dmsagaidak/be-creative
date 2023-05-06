import React from 'react';
import {Card, Typography} from "@mui/material";
import { ChatMessage } from '../../../types';
import dayjs from 'dayjs';

interface Props {
  message: ChatMessage
}

const MessageItem: React.FC<Props> = ({message}) => {
  return (
    <Card sx={{ mb: 1, p: 2 }}>
      <Typography component="p">{message.username} writes at {dayjs(message.datetime).format('HH:MM DD.MM.YYYY')}:</Typography>
      <Typography component="p">{message.text}</Typography>
    </Card>
  );
};

export default MessageItem;