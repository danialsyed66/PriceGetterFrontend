import React from 'react';
import './forum.css';
import { useDispatch, useSelector } from 'react-redux';

import { deleteComment } from '../../redux/actions/forumsActions';
import printDate from '../../utils/printDate';

const Comment = ({
  comment: { _id, text, name, avatar, user, createdAt },
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <>
      {auth ? (
        <div className="post bg-white my-1 p-1" style={{ minHeight: '20vh' }}>
          <div>
            <img
              style={{ width: '70px' }}
              className="rounded-circle"
              src={avatar}
              alt={`${name}'s Avatar`}
            />
            <h5>{name}</h5>
          </div>

          <div>
            <p className="my-1">{text}</p>
            <p className="post-date">{printDate(createdAt)}</p>
            {auth.isAuth && auth.user._id === user && (
              <i
                id="delete_cart_item"
                className="fa fa-trash btn btn-danger m-1"
                onClick={() => dispatch(deleteComment(postId, _id))}
              ></i>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Comment;
