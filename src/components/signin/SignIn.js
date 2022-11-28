import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../../screen/form/Form.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('incorrectly filled field');
    const [passwordError, setPasswordError] = useState('incorrectly filled field');
    const [isType, setIsType] = useState(true);
    const regEmail = useMemo(() => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, []);
    const regPassword = useMemo(() => /^[a-z 0-9]{6,}$/g, []);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:'getUserList'
        })
    },[dispatch]);
    const dataList = useSelector((store)=>{return store.usersDataReducer.users});

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
        if (!regEmail.test(String(e.target.value).toLowerCase())) {
            setEmailError('incorrect email');
        } else {
            setEmailError('');
        }
    }, [email]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        if (!regPassword.test(String(e.target.value).toLowerCase())) {
            setPasswordError('incorrect password');
        } else {
            setPasswordError('');
        }
    }, [password]);

    const blureHandler = useCallback((e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    }, [emailDirty, passwordDirty]);

    const onShowPassword = useCallback(() => setIsType(!isType));
    const navigate = useNavigate();
    const enterIn = useCallback(()=>{
        for (let data of dataList){
            if (email === data.email && password === data.password){
                navigate(`/homepage/${data.email}`)
            }
        }
    },[email,password,dataList,navigate]);

    return (
        <>
            <div className="sign-in-htm">
                <div className="group">
                    <label htmlFor="user" className="label">Email</label>
                    {(emailDirty && emailError) && <div className={'error'}>{emailError}</div>}
                    <input id="user" type="email" value={email} className="input" onBlur={blureHandler}
                           onChange={onChangeEmail} name={'email'}/>
                </div>
                <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    {(passwordDirty && passwordError) && <div className={'error'}>{passwordError}</div>}
                    <input id="pass" value={password} type={isType ? "password" : "text"} className="input"
                           onBlur={blureHandler}
                           onChange={onChangePassword} name={'password'} placeholder={'6 - 10 characters'}/>
                </div>
                <div className="group">
                    <label htmlFor="pass" className="label">Show Password</label>
                    <div onClick={onShowPassword} className="chekcbox">SHOW</div>
                </div>
                <div className="group">
                    <input type="submit" className="button" value="Sign In"  onClick={enterIn}/>
                </div>
                <div className="hr"></div>
            </div>
        </>
    );
}

export default SignIn;