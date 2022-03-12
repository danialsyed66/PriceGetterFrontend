import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Category.css';
import icons from './icons';

const Category = ({ first }) => {
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 1100 ? true : false,
  });
  const [itemsShow, setitemsShow] = useState(7);

  useEffect(() => {
    let mediaQuery = window.matchMedia('(min-width: 1000px)');
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);
  useEffect(() => {
    if (mQuery.matches) setitemsShow(7);
    else setitemsShow(2);
  }, [mQuery]);

  const render = (src, text, val) => (
    // <div className="zoom-box justify-content-center col col-lg-1 col-md-4 col-sm-6">
    <div
      className="zoom-box d-flex justify-content-center align-items-center flex-column"
      key={val}
    >
      <Link to={`/filter?cat=${val}`}>
        <img className="cat_img" src={src} alt={text} />
        <p className="h5 p-2 m-2">{text}</p>
      </Link>
    </div>
  );
  return (
    // <div className="row category_layout p-4 justify-content-around align-content-center pl-5 pr-5">
    <div className="category_layout p-4 d-flex justify-content-around align-content-center flex-column flex-md-row pl-5 pr-5">
      {icons.map(({ src, text, val }, i) => {
        if (first)
          if (i < itemsShow) return render(src, text, val);
          else return null;
        else if (i >= itemsShow) return render(src, text, val);
        else return null;
      })}
    </div>
  );
};

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>
        <Category first />
      </CardContent>
      <CardActions disableSpacing sx={{ alignItems: 'center' }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ alignItems: 'center' }}
        >
          <ExpandMoreIcon sx={{ justifyContent: 'center' }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Category />
        </CardContent>
      </Collapse>
    </Card>
  );
}
