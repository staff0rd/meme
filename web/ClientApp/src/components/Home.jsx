import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

export const Home = () => {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const cellHeight = isLgUp ? 400 : isSmUp ? 250 : 160;
  const handleClose = () => setSelected(null);
  const classes = useStyles();
  const generate = () => {};
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/memes');
      const json = await response.json();
      console.log(json);
      setFiles(json);
    };
    fetchData();
  }, []);

  return (
    <>
      <GridList cellHeight={cellHeight} cols={3}>
        {files.map((f) => (
          <GridListTile key={f.name} cols={1} onClick={() => setSelected(f)}>
            <img src={f.path} alt={f.name} title={f.name} />
            <GridListTileBar
                title={f.name}
              />
          </GridListTile>
        ))}
      </GridList>
      <Modal
        open={selected}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
          {selected && (
            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={6} className={classes.preview} style={{backgroundImage: `url(${selected.path})`}} />
              <Grid item xs={6}>
                <form noValidate autoComplete="off">
                <Grid container>
                  <Grid item xs={12}>
                    <TextField className={classes.textfield} label="Top line" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField className={classes.textfield} label="Bottom line" />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox name="checkedC" />}
                          label="Trigger" 
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox name="checkedC" />}
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
          )}
        </Paper>
      </Modal>
    </>
  );
}
