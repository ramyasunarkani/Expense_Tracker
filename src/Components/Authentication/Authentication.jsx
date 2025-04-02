import React, { useState } from 'react';
import styles from './Authentication.module.css';
import Login from './Login';
import SignUp from './SignUp';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);

    return isLogin ? <Login onSwitch={() => setIsLogin(false)} /> : <SignUp onSwitch={() => setIsLogin(true)} />;
};

export default Authentication;
