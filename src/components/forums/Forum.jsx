import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import PostForm from './PostForm';
import { Footer, Loader, MetaData, Navbar } from '../layouts';
import fire from '../../utils/swal';
import { getPosts } from '../../redux/actions/forumsActions';
import { DELETE_POST_RESET } from '../../redux/consts';

const Forum = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const { loading, posts, message } = useSelector(state => state.forums);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!message) return;

    fire(message, 'success');

    dispatch({ type: DELETE_POST_RESET });
  }, [dispatch, message]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <MetaData title="Forums" />

      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <section className="container">
          <h1 className="large ">Forums</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community.
          </p>
          {toggle || (
            <button
              className="btn_post"
              onClick={() => {
                setToggle(true);
              }}
            >
              Create a Post
            </button>
          )}
          {toggle && <PostForm />}

          <div className="posts">
            {posts.map(post => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Forum;
