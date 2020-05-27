import React, { useState, useEffect } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Modal from './Modal';

export const Home = () => {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const cellHeight = isSmUp ? 250 : 160;
  const handleClose = () => setSelected(null);
 
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
        { selected && <Modal handleClose={handleClose} selectedMeme={selected} /> }
    </>
  );
}
