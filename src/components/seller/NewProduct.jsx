import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../products/Home.css';
import Layout from './layout/Layout';
import { Loader, MetaData } from '../layouts';
import fire from '../../utils/swal';
import { createProduct } from '../../redux/actions/sellerActions';
import { CREATE_PRODUCT_RESET } from '../../redux/consts';
import reduceImage from '../../utils/reduceImage';

const NewProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Accessories',
    // 'Health',
    'Books',
    'Cameras',
    'Clothes',
    'Electronics',
    'Food',
    'Headphones',
    'Home',
    'Laptops',
    'Outdoor',
    // Shoes
    'Smart Phones',
    'Sports',
  ];

  const dispatch = useDispatch();

  const { loading, message } = useSelector(state => state.seller);

  useEffect(() => {
    if (!message) return;

    fire(message, 'success');

    navigate('/seller/products');

    dispatch({ type: CREATE_PRODUCT_RESET });
  }, [dispatch, navigate, message]);

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);

    images.forEach(image => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData));
  };

  const onChange = async e => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2) {
          const reducedImage = await reduceImage(reader.result);

          setImagesPreview(oldArray => [...oldArray, reducedImage]);
          setImages(oldArray => [...oldArray, reducedImage]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <MetaData title={'New Product'} />
      <Layout>
        <div className="row">
          <div className="col-12 ">
            <div className="wrapper ">
              {loading ? (
                <Loader />
              ) : (
                <form
                  className="shadow-lg"
                  onSubmit={submitHandler}
                  encType="multipart/form-data"
                >
                  <h1 className="mb-4">Fill all the fields</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="text"
                      id="price_field"
                      className="form-control"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea
                      className="form-control"
                      id="description_field"
                      rows="8"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select
                      className="form-control"
                      id="category_field"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock_field">Stock</label>
                    <input
                      type="number"
                      id="stock_field"
                      className="form-control"
                      value={stock}
                      onChange={e => setStock(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Images</label>

                    <div className="custom-file">
                      <input
                        type="file"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                      </label>
                    </div>

                    {imagesPreview.map(img => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading ? true : false}
                  >
                    CREATE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default NewProduct;
