import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Footer, Loader, Navbar } from '../layouts';
import Post from './Post';
import { getPosts } from '../../redux/actions/forumsActions';
import { DELETE_POST_RESET } from '../../redux/consts';
import fire from '../../utils/swal';

const Forum = () => {
  const dispatch = useDispatch();

  const { loading, posts, message /*,  error, post */ } = useSelector(
    (state) => state.forums
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!message) return;

    fire(message, 'success');

    dispatch({ type: DELETE_POST_RESET });
  }, [dispatch, message]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community.
          </p>
          <div className="posts">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Forum;
