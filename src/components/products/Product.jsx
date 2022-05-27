import React, { memo, useEffect, useRef, useState } from 'react';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleFavourite as handleFavouriteAction } from '../../redux/actions/userActions';
import PriceGetter from '../../assets/PriceGetter.png';
import Heart from '../../utils/Heart';
import './Home.css';

const Product = ({ product, col, callbackRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef(null);

  const { user } = useSelector(state => state.auth);
  const [isFavourite, setIsFavourite] = useState(false);

  const isImage = url =>
    /http(|s):(.*?).(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

  product.images = product.images?.filter(image => isImage(image.url));

  useEffect(() => {
    // if (!user || !product) return;
    setIsFavourite(user?.favouriteIds?.includes(product?._id));
  }, [user, product]);

  const handleFavourite = (e, id) => {
    if (!user) return navigate('/login');

    setIsFavourite(!isFavourite);

    dispatch(handleFavouriteAction(id));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (isImage(entry.target.dataset.src)) {
          entry.target.setAttribute('src', entry.target.dataset.src);
        } else {
          entry.target.classList.remove('lazy-img');
        }
        entry.target.addEventListener('load', function () {
          entry.target.classList.remove('lazy-img');
        });
      }
    });
    const { current: img } = imgRef;
    if (img) observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [imgRef]);

  return (
    <div
      className={`col-sm-10 col-md-6 col-lg-${col} box_pad`}
      style={{ borderRadius: '20px' }}
      ref={callbackRef}
      key={product._id}
      data-id={product._id}
    >
      <div className="product_box my-2">
        <div className="py-3 px-1">
          <div className="d-flex flex-column justify-content-center align-content-center pl-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Checkbox
                icon={<Heart color="grey" />}
                checkedIcon={<Heart color="red" />}
                className="zoom-box"
                onClick={e => handleFavourite(e, product._id)}
                checked={isFavourite}
              />
              {product.discount > 0 && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    background: '#FFE6E6',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '4px',
                    height: '20px',
                    width: '40px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      lineHeight: '12px',
                      verticalAlign: 'center',
                      textAlign: 'center',
                      marginBottom: '0',
                      color: '#E61919',
                    }}
                  >
                    {Math.round(product.discount)}%
                  </p>
                </div>
              )}
              <img
                style={{ width: '60px', cursor: 'pointer' }}
                alt="seller pic"
                src={product?.seller?.logo?.url}
                onClick={() => {
                  const newWindow = window.open(product.url, '_blank');
                  if (newWindow) newWindow.opener = null;
                }}
              />
            </div>

            {product.images && (
              <img
                style={{ borderRadius: '20px' }}
                className="m-auto card-img-top lazy-img zoom-box pointer"
                alt="product pic"
                src={PriceGetter}
                data-src={product.images?.[0]?.url}
                ref={imgRef}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            )}
          </div>
          <div
            className="card-body d-flex flex-column pl-3"
            style={{
              padding: 'auto',
              marginTop: '20px',
              borderRadius: '20px ',
            }}
          >
            <h5
              className="card-title"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {product.name.replace(/^(.{15}[^\s]*).*/, '$1')}{' '}
            </h5>

            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.rating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="card-text"
                  style={{
                    fontSize: '12px',
                    color: '#5B6370',
                    margin: '0',
                  }}
                >
                  {product.oldPrice && <del>Rs. {product.oldPrice}</del>}
                </p>
                <p
                  className="card-text"
                  style={{ fontSize: '16px', color: '#282B30' }}
                >
                  Rs.{' '}
                  <span style={{ fontWeight: 'bold' }}>{product.price}</span>
                </p>
              </div>

              {product.stock === 'In Stock' || product.stock > 0 ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    background: '#9aeb91  ',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '4px',

                    height: '20px',
                    width: '50px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      lineHeight: '12px',
                      verticalAlign: 'center',
                      textAlign: 'center',
                      marginBottom: '0',
                      color: 'black',
                    }}
                  >
                    In stock
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
