import React from 'react';
import { Card, Typography } from '@mui/material';
import { ChatMessage } from '../../../types';
import dayjs from 'dayjs';
import { boxShadow } from '../../../styles';

interface Props {
  message: ChatMessage;
}

const MessageItem: React.FC<Props> = ({ message }) => {
  return (
    <Card sx={{ mb: 1, p: 2 }} style={{ boxShadow }}>
      <Typography component="p">
        <Typography component="span" style={{ fontWeight: 700, paddingRight: '10px' }}>
          {message.username}
        </Typography>
        writes at
        <Typography component="span" style={{ fontWeight: 700, paddingLeft: '10px' }}>
          {dayjs(message.datetime).format('HH:MM DD.MM.YYYY')}
        </Typography>
        :
      </Typography>
      <Typography component="p">{message.text}</Typography>
    </Card>
  );
};

export default MessageItem;
