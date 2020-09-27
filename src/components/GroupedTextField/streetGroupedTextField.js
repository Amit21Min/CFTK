import React from 'react';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import ChipList from '../ChipList';


const dualGroupedTextField = (props) => {

  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <TextField
          fullWidth variant="filled" error={props.error}
          style={{ height: "100%", width: "100%"}}
          label={props.label1}
          value={props.value1}
          onChange={props.onChange1}
          // multiline
          // rows={Math.floor(props.list.length / 3)}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth variant="filled" error={props.error}
          style={{ height: "100%", width: "100%"}}
          label={props.label2}
          value={props.value2}
          onChange={props.onChange2}
          // multiline
          // rows={Math.floor(props.list.length / 3)}
          // InputProps={ props.list.length > 0 ? {
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <ChipList list={props.list}></ChipList>
          //     </InputAdornment>
          //   ),
          // }: null}
        />
      </Grid>
      <Grid item xs={2}>
        <Button fullWidth style={{ height: "100%", width: "100%", borderRadius: '5em' }} color={props.buttonColor}
          onClick={props.onButtonClick}
          disabled={props.value1.length === 0 || props.value2.length === 0}
        >
          {props.buttonLabel}
        </Button>
      </Grid>
    </Grid>
  );
};

export default dualGroupedTextField;
