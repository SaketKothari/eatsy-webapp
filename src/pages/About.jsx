import { useState } from 'react';

import User from '../components/ClassComponent/User';
import UserClass from '../components/ClassComponent/UserClass';

const About = () => {
  const [btnName, setBtnName] = useState('Login');
  return (
    <div>
      <h1>About Us Page</h1>
      <button
        onClick={() =>
          btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login')
        }
      >
        {btnName}
      </button>
      <User name={'Batman (function)'} />
      <UserClass name={'Batman (class)'} location={'Gotham (class)'} />
    </div>
  );
};

export default About;
