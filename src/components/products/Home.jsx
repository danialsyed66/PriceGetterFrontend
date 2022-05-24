import React from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import './Home.css';
import Product from './Product';
import { Category, Footer, Navbar, Header, Loader, MetaData } from '../layouts';
import Zoom from '@mui/material/Zoom';
import { AppBar } from '@mui/material';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import uparrow from '../../assets/arrow-up-short.svg';

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Home = props => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const { home, loading } = useSelector(state => state.home);

  const renderCrouser = (object, text) => (
    <>
      {object && (
        <>
          <div className="col-md-12 ml-4">
            <h1 id="products_heading">{text}</h1>
          </div>
          <div className="col-md-12">
            <Carousel responsive={responsive}>
              {object.map(prod => (
                <Product col={10} key={prod._id} product={prod} />
              ))}
            </Carousel>
          </div>
        </>
      )}
    </>
  );

  return (
    <div>
      <MetaData title="Home" />

      <div id="back-to-top-anchor">
        <ElevationScroll {...props}>
          <AppBar>
            <Navbar />
          </AppBar>
        </ElevationScroll>
        <Header />
        <Category />
      </div>
      <section id="products" className="container mt-5">
        <div className="row mt-4">
          {loading || !home?.categories ? (
            <Loader />
          ) : (
            <>
              {home?.recommended &&
                renderCrouser(
                  home?.recommended?.recommended,
                  'Recommended for you!'
                )}
              {renderCrouser(
                home?.categories?.books,
                'Escape the real world with a Book!'
              )}
              {renderCrouser(home?.categories?.food, 'Food and Refreshments!')}
              {renderCrouser(home?.categories?.clothes, 'Clothes and Wears!')}
              {renderCrouser(home?.categories?.cameras, 'Cameras and Lens!')}
              {renderCrouser(
                home?.categories?.laptops,
                'New Laptops & Computers!'
              )}
              {renderCrouser(home?.categories?.smartPhones, 'Phone Offers!')}
              {renderCrouser(home?.categories?.sports, 'Dive into Sports!')}
              {renderCrouser(home?.categories?.home, 'Household Necessities!')}
              {renderCrouser(
                home?.categories?.accessories,
                'Accessories for you!'
              )}
              {renderCrouser(home?.categories?.electronics, 'Electronics')}
              {renderCrouser(
                home?.categories?.outdoor,
                'Take a step into the wild!'
              )}
              {renderCrouser(home?.categories?.headphones, 'Best Headphones!')}
              <hr />
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Products by Various Sellers</h1>
              </div>
              {renderCrouser(home?.sellers?.daraz, 'By Daraz')}
              {renderCrouser(home?.sellers?.yayvo, 'By Yayvo')}
              {renderCrouser(home?.sellers?.iBucket, 'By iBucket')}
              {renderCrouser(home?.sellers?.goto, 'By Goto')}
            </>
          )}
        </div>
        <ScrollTop {...props}>
          <Fab
            color="secondary"
            size="small"
            aria-label="scroll back to top"
            style={{ backgroundColor: 'green' }}
          >
            <img src={uparrow} alt="" />
          </Fab>
        </ScrollTop>
      </section>
      <div className="d-flex justify-content-center mt-6 align-content-center"></div>
      <Footer />
    </div>
  );
};

export default Home;
