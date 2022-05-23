import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MetaData, Loader, Navbar, Footer } from '../layouts';
import { updateProfile } from '../../redux/actions/userActions';
import { loadUser } from '../../redux/actions/authActions';
import { UPDATE_PROFILE_RESET } from '../../redux/consts';
import fire from '../../utils/swal';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { isUpdated, error, loading } = useSelector(state => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar ? user.avatar.url : '/images/default_avatar.jpg'
  );

  useEffect(() => {
    if (error) return fire(error);

    if (isUpdated) {
      fire('User updated successfully!', 'success');

      dispatch(loadUser());

      navigate('/profile');

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [navigate, dispatch, error, isUpdated]);

  const handleAvatarUpload = e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState !== 2) return;
      if (!reader.result) return;

      setAvatar(reader.result);
      setAvatarPreview(reader.result);
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    if (avatar) formData.set('avatar', avatar);

    dispatch(updateProfile(formData));
  };

  return (
    <>
      <MetaData title="Update Profile" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                style={{ borderRadius: '20px' }}
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="Avatar Preview"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={handleAvatarUpload}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  style={{ backgroundColor: '#008000', borderColor: 'white' }}
                  type="submit"
                  className="btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default UpdateProfile;
