import React, { useState, useEffect } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export const Home = () => {
  const [files, setFiles] = useState([]);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
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
    <GridList cellHeight={isSmUp ? 250 : 160} cols={3}>
      {files.map((f) => (
        <GridListTile key={f} cols={f.cols || 1}>
          <img src={`/memes/${f}`} alt={f} title={f} />
          <GridListTileBar
              title={f}
            />
        </GridListTile>
      ))}
    </GridList>
  );
}
