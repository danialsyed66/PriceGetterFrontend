import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import "./Home.css";
import { Product } from "../products";
import { Category, Footer, Navbar, Loader } from "../layouts";
import { getProducts } from "../../redux/actions/productActions";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";

const Filter = () => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState([0, 500000]);
  const [queryParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange /*,setPriceRange*/] = useState([1, 1000]);
  // const [sliderRange, setSliderRange] = useState([1, 1000]);
  // const [category /*,setCategory*/] = useState();
  const [rating /*,setRating*/] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [category /* , setCategory */] = useState(queryParams.get("cat"));
  const [query /* , setQuery */] = useState(queryParams.get("q"));

  const observer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, totalProducts } = useSelector(
    (state) => state.products
  );
  const length = products.length;
  // const { currentProduct } = useSelector(state => state.productDetails);

  const [queryObject, setQueryObject] = useState({});

  useEffect(() => {
    queryParams.set("q", query);
    const obj = {};
    [...queryParams.keys()].forEach((element) => {
      obj[element] = queryParams.get(element);
    });

    setQueryObject(obj);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    navigate({
      path: "/filter",
      search: `?${createSearchParams(queryObject)}`,
    });
  }, [navigate, queryObject]);

  useEffect(() => {
    dispatch(getProducts(currentPage, query, priceRange, category, rating));
  }, [dispatch, currentPage, query, priceRange, category, rating]);

  // useEffect(() => {
  //   if (!currentProduct) return;

  //   document
  //     .querySelector(`[data-id='${currentProduct}']`)
  //     .scrollIntoView({ behavior: 'smooth' });
  // }, [currentProduct]);

  useEffect(() => {
    if (length >= totalProducts) setHasMore(false);
  }, [length, totalProducts]);

  const observerCallBack = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setCurrentPage((currentPage) => currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <div>
        <Navbar />
        <Category />
      </div>
      <section id="products" className="container-fluid mt-5">
        <div className="row mt-4">
          <div className="col-md-2">
            <h4 style={{ fontWeight: "bold" }}>Filters</h4>
            <div className="mb-3 pl-3">
              <p style={{ margin: "0", fontWeight: "bold" }}>Price</p>
              <Slider
                color="secondary"
                sx={{ width: "200px" }}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                max={500000}
              />
            </div>
            <FormControl className="pl-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="1000"
                  control={<Radio color="secondary" />}
                  label="Up to Rs.1000"
                />
                <FormControlLabel
                  value="5000"
                  control={<Radio color="secondary" />}
                  label="Up to Rs.5000"
                />
                <FormControlLabel
                  value="others"
                  control={<Radio color="secondary" />}
                  label="10000RS-50000RS"
                />
                <FormControlLabel
                  value="otherss"
                  control={<Radio color="secondary" />}
                  label="50000RS-100000RS"
                />
                <FormControlLabel
                  value="othersss"
                  control={<Radio color="secondary" />}
                  label="Atleast Rs.100000"
                />
              </RadioGroup>
            </FormControl>
            <div className="d-flex mb-2">
              <p style={{ margin: "0", fontWeight: "bold" }}>Categorys</p>
            </div>

            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" color="secondary" className="p-0" />
              <p style={{ margin: "0" }}>Headphones & Gaming Headsets</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Mobile Phones</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Game Consoles</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Shoes</p>
            </div>

            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>TVs</p>
            </div>

            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Wearables</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Food</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Home</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Books</p>
            </div>
            <div className="d-flex mb-2">
              <p style={{ margin: "0", fontWeight: "bold" }}>From Sites</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Daraz</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>Yayvo</p>
            </div>
            <div className="d-flex mb-2">
              <Checkbox aria-label="checks" />
              <p style={{ margin: "0" }}>PriceGetter</p>
            </div>
          </div>
          <div className="col-md-10">
            <h1 id="products_heading">Search Related Products</h1>
            <div className="row">
              {length ? (
                <>
                  {products.map((prod, i) => (
                    <Product
                      col={3}
                      key={prod._id}
                      product={prod}
                      callbackRef={i === length - 10 ? observerCallBack : null}
                    />
                  ))}
                  {!loading || <Loader />}
                </>
              ) : (
                <>{!loading || <Loader />}</>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center mt-6 align-content-center"></div>
      <Footer />
    </div>
  );
};

export default Filter;
