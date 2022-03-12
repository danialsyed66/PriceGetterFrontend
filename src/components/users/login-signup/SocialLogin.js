import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import TLogin from 'react-twitter-login';
import {
  GoogleLogin as GLogin,
  GoogleLogout as GLogout,
} from 'react-google-login';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { socialLogin, logout } from '../../../redux/actions/authActions';
import { SOCIAL_LOGIN_FAIL } from '../../../redux/consts';

export const GoogleLogin = () => {
  const dispatch = useDispatch();

  const success = res => {
    const {
      profileObj: { email, googleId, imageUrl, name },
    } = res;
    dispatch(
      socialLogin({
        name,
        email,
        socialId: googleId,
        avatar: imageUrl,
        provider: 'google',
      })
    );
  };

  return (
    <GLogin
      clientId="779694171785-2umgkrr1laq4ro4herg15ahl7fq3jvj6.apps.googleusercontent.com"
      onSuccess={success}
      onFailure={() => dispatch({ type: SOCIAL_LOGIN_FAIL })}
      cookiePolicy={'single_host_origin'}
      render={props => (
        <Button
          sx={{ color: 'red', borderColor: 'red' }}
          style={{ width: '45%', margin: 'auto' }}
          variant="outlined"
          startIcon={<GoogleIcon style={{ color: 'red' }} />}
          onClick={props.onClick}
        >
          Google
        </Button>
      )}
    />
  );
};

export const TwitterLogin = () => {
  const dispatch = useDispatch();

  const success = res => {
    const {
      profileObj: { email, googleId, imageUrl, name },
    } = res;
    dispatch(
      socialLogin({
        name,
        email,
        socialId: googleId,
        avatar: imageUrl,
        provider: 'google',
      })
    );
  };

  return (
    <TLogin
      authCallback={success}
      consumerKey={'Rl92SFFmMG5NZmdxcnIwdWIydUY6MTpjaQ'}
      consumerSecret={'CQ_lij6dVDLezrqxMD81ayBAMRaa51q7H2HKZgRbkZTDSix0yo'}
      children={
        <Button
          style={{ width: '120%', margin: 'auto' }}
          variant="outlined"
          startIcon={<TwitterIcon />}
        >
          Twitter
        </Button>
      }
    />
  );
};

export const GoogleLogout = () => {
  const dispatch = useDispatch();

  return (
    <GLogout
      clientId="779694171785-2umgkrr1laq4ro4herg15ahl7fq3jvj6.apps.googleusercontent.com"
      onLogoutSuccess={() => dispatch(logout())}
      cookiePolicy={'single_host_origin'}
      buttonText="Logout"
      className="dropdown-item text-danger"
    />
  );
};
