import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import Like from '../../utils/Like';
import {
  handleLike as handleLikeAction,
  deletePost,
} from '../../redux/actions/forumsActions';
import printDate from '../../utils/printDate';

const Post = ({
  post: { _id, text, name, avatar, user, likes, comments, createdAt },
  showActions,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!likes) return;

    if (!auth.isAuth) return;

    const liked = likes.filter(like => like.user === auth?.user?._id);

    setIsLiked(liked.length > 0 ? true : false);
  }, [setIsLiked, likes, auth]);

  const handleLike = (e, id) => {
    if (!auth.isAuth) return navigate('/login');

    setIsLiked(!isLiked);

    dispatch(handleLikeAction(id));
  };

  return (
    <div className="post bg-white my-1 p-1" style={{ minHeight: '30vh' }}>
      <div>
        <Link to={`/user/${user}`}>
          <img
            className="rounded-circle"
            src={avatar}
            alt={`${name}'s Avatar`}
          />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">{printDate(createdAt)}</p>
        <Checkbox
          icon={<Like color="grey" likes={likes?.length} />}
          checkedIcon={<Like color="red" likes={likes?.length} />}
          className="zoom-box"
          onClick={e => handleLike(e, _id)}
          checked={isLiked}
        />
        {showActions && (
          <>
            <Link to={`/forums/post/${_id}`} className="btn btn-primary m-1">
              Discussion{' '}
              {comments?.length > 0 && (
                <span className="comment-count">{comments?.length}</span>
              )}
            </Link>
            {auth.isAuth && auth.user._id === user && (
              <i
                id="delete_cart_item"
                className="fa fa-trash m-3"
                style={{ color: 'red' }}
                onClick={() => dispatch(deletePost(_id))}
              ></i>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Post.defaultProps = { showActions: true };

export default Post;
