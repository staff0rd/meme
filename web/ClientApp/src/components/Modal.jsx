import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
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
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  preview: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textfield: {
    width: '100%',
  },
  result: {
    marginTop: theme.spacing(3),
  },
}));

export default ({ handleClose, selectedMeme }) => {
  const classes = useStyles();
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePath, setImagePath] = useState(selectedMeme.path)
  const generate = () => {
    setLoading(true);
    setError(null);
    setOutput(null);
    fetch(`/memes/generate?meme=${selectedMeme.name}&top=${topLine}&bottom=${bottomLine}&shake=${shake}&trigger=${triggered}`)
    .then(response => {
      setLoading(false);
      response.json()
      .then(data => {
        if (data.errors.length) {
          setError(data.errors);
          setOutput(null);
        } else {
          setOutput(data.output);
          const ext = (triggered || shake) ? 'gif' : 'png';
          setImagePath(`/memes/image/${data.name}.${ext}`);
          setError(null);
        }
      });
    });
  };
  const [topLine, setTopLine] = useState("");
  const [bottomLine, setBottomLine] = useState("");
  const [shake, setShake] = useState(false);
  const [triggered, setTriggered] = useState(false);

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
            <Grid container item xs={6} className={classes.previewContainer}>
              <img className={classes.preview} src={imagePath} />
            </Grid>
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
                        control={<Checkbox value={shake} onChange={e => setTriggered(e.target.checked)} />}
                        label="Triggered" 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox value={triggered} onChange={e => setShake(e.target.checked)} />}
                        label="Shake" 
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  { loading && <CircularProgress /> }
                  { !loading && <Button variant='contained' color='primary' onClick={generate}>Generate</Button> }
                </Grid>
                { output && (
                  <Grid item xs={12}>
                    <Alert className={classes.result} severity="success">Image generated</Alert>
                  </Grid>
                )}
                { error && (
                  <Grid item xs={12}>
                    <Alert className={classes.result} severity="error">{error}</Alert>
                  </Grid>
                )}
              </Grid>
            </form> 
            </Grid>
          </Grid> 
          
        </Paper>
      </Modal>
  );
}
