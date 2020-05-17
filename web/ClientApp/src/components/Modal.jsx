import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    width: '70%',
    height: '70%',
  },
  container: {
    height: '100%',
    '&.MuiGrid-spacing-xs-3': {
      margin: 0,
    },
  },
  preview: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  textfield: {
    width: '100%',
  }
}));

export default ({ handleClose, selectedMeme }) => {
  const classes = useStyles();
  const generate = () => {
    console.log(topLine);
    console.log(bottomLine);

  };
  const [topLine, setTopLine] = useState(null);
  const [bottomLine, setBottomLine] = useState(null);

  return (
      <Modal
        open={selectedMeme}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={6} className={classes.preview} style={{backgroundImage: `url(${selectedMeme.path})`}} />
            <Grid item xs={6}>
              <form noValidate autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField className={classes.textfield} label="Top line" onChange={e => setTopLine(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.textfield} label="Bottom line" onChange={(e) => setBottomLine(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Trigger" 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Shake" 
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' color='primary' onClick={generate}>Generate</Button>
                </Grid>
              </Grid>
            </form> 
            </Grid>
          </Grid> 
          
        </Paper>
      </Modal>
  );
}
