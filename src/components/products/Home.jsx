import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import arrowright from '../../assets/arrow-right.svg';
import { setFilters } from '../../redux/actions/filterActions';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const redirect = useQuery().get('redirect');

  useEffect(() => {
    if (!redirect) return;

    navigate(-2);
  }, [navigate, redirect]);

  const handleViewMore = (conditionFor, condition) => {
    if (conditionFor === 'seller')
      dispatch(setFilters({ sellers: [condition.seller] }));
    if (conditionFor === 'category')
      dispatch(setFilters({ categories: [condition['category.search']] }));

    navigate('/filter?nav=true');
  };

  const renderCrouser = (renderFor, text, products, condition) => (
    <>
      {products && (
        <>
          <div className="col-md-12 ml-4">
            <h1 id="products_heading">{text}</h1>
          </div>
          <div className="col-md-12">
            <Carousel responsive={responsive}>
              {products.map(prod => (
                <Product col={10} key={prod._id} product={prod} />
              ))}
              {renderFor !== 'recommended' && (
                <div
                  className={`col-sm-10 col-md-6 col-lg-10 box_pad`}
                  style={{ borderRadius: '20px', cursor: 'pointer' }}
                  onClick={() => handleViewMore(renderFor, condition)}
                >
                  <div className=" my-2">
                    <div className="py-3  d-flex flex-column justify-content-center align-items-center">
                      <img src={arrowright} alt="" />
                      <p>View more</p>
                    </div>
                  </div>
                </div>
              )}
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
                  'recommended',
                  'Recommended for you!',
                  home?.recommended?.recommended
                )}
              {renderCrouser(
                'category',
                'Escape the real world with a Book!',
                home?.categories?.books?.value,
                home?.categories?.books?.condition
              )}
              {renderCrouser(
                'category',
                'Food and Refreshments!',
                home?.categories?.food?.value,
                home?.categories?.food?.condition
              )}
              {renderCrouser(
                'category',
                'Clothes and Wears!',
                home?.categories?.clothes?.value,
                home?.categories?.clothes?.condition
              )}
              {renderCrouser(
                'category',
                'Cameras and Lens!',
                home?.categories?.cameras?.value,
                home?.categories?.cameras?.condition
              )}
              {renderCrouser(
                'category',
                'New Laptops & Computers!',
                home?.categories?.laptops?.value,
                home?.categories?.laptops?.condition
              )}
              {renderCrouser(
                'category',
                'Phone Offers!',
                home?.categories?.smartPhones?.value,
                home?.categories?.smartPhones?.condition
              )}
              {renderCrouser(
                'category',
                'Dive into Sports!',
                home?.categories?.sports?.value,
                home?.categories?.sports?.condition
              )}
              {renderCrouser(
                'category',
                'Household Necessities!',
                home?.categories?.home?.value,
                home?.categories?.home?.condition
              )}
              {renderCrouser(
                'category',
                'Accessories for you!',
                home?.categories?.accessories?.value,
                home?.categories?.accessories?.condition
              )}
              {renderCrouser(
                'category',
                'Electronics',
                home?.categories?.electronics?.value,
                home?.categories?.electronics?.condition
              )}
              {renderCrouser(
                'category',
                'Take a step into the wild!',
                home?.categories?.outdoor?.value,
                home?.categories?.outdoor?.condition
              )}
              {renderCrouser(
                'category',
                'Best Headphones!',
                home?.categories?.headphones?.value,
                home?.categories?.headphones?.condition
              )}
              <hr />
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Products by Various Sellers</h1>
              </div>
              {renderCrouser(
                'seller',
                'By Daraz',
                home?.sellers?.daraz?.value,
                home?.sellers?.daraz?.condition
              )}
              {renderCrouser(
                'seller',
                'By Yayvo',
                home?.sellers?.yayvo?.value,
                home?.sellers?.yayvo?.condition
              )}
              {renderCrouser(
                'seller',
                'By iBucket',
                home?.sellers?.iBucket?.value,
                home?.sellers?.iBucket?.condition
              )}
              {renderCrouser(
                'seller',
                'By Goto',
                home?.sellers?.goto?.value,
                home?.sellers?.goto?.condition
              )}
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
