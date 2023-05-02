import React, { useState } from 'react';
import {Button, Grid, TextField} from "@mui/material";

interface Props {
  sendMessage: (messageText: string) => void;
}

const ChatForm: React.FC<Props> = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(messageText);
    setMessageText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            label="Your message"
            type="text"
            value={messageText}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="success">Send</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChatForm;