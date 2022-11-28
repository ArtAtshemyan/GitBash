import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../../screen/form/Form.css';
import {useDispatch, useSelector} from "react-redux";
import './SignUp.css'
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import IdGenerator from "../utils/IdGenerator";

function SignUp() {
    const {emails} = useParams();
    const navigation = useNavigate()
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userLastName, setuserLastName] = useState('')
    const [password, setPassword] = useState('');
    const onChangeUserName = useCallback((e) => {
        setUserName(e.target.value)
    }, [username]);
    const onChangeUserLastName = useCallback((e)=>{
         setuserLastName(e.target.value)
    },[userLastName])
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [email])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [password])

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:'getUserList'
        })
    },[dispatch]);

    const dataList = useSelector((store)=>{return store.usersDataReducer.users});
    const addUser = useCallback(()=>{
        dataList.forEach((item)=>{
            if (item.email === email){
                alert('email exist')
            }
            else {
                const userObj = {
                    id: IdGenerator(),
                    name: username,
                    lastName: userLastName,
                    password: password,
                    email:email
                }
                dataList.push(userObj);
                localStorage.setItem('usersData',JSON.stringify(dataList));
                dispatch({
                    type: 'getUserList'
                })
                navigation(`/homepage/${emails}`)
            }
        })
    },[dataList,email,password,username,userLastName,emails])
    return (
        <>
            <div className="sign-up-htm">
                <div className="group">
                    <input id="user" type="text" className="input" value={username} onChange={onChangeUserName} placeholder={'Firstname'}/>
                </div>
                <div className="group">
                    <input id="user" type="text" className="input" value={userLastName} onChange={onChangeUserLastName} placeholder={'Lastname'}/>
                </div>
                <div className="group">
                    <input id="pass" type="password" className="input" data-type="password" value={password}
                           onChange={onChangePassword} placeholder={'Password'}/>
                </div>
                <div className="group">
                    <input id="pass" type="text" className="input" value={email} onChange={onChangeEmail} placeholder={'Email'}/>
                </div>
                <div className="group">
                    <input type="submit" className="button" value="Add"  onClick={addUser}/>
                </div>
                <div className="hr"></div>
            </div>
        </>
    );
}

export default SignUp;












// if (!!item.email.includes(email)){
//     alert('email exist')
// }else {
//     const userObj = {
//         id: uuid(),
//         name: username,
//         lastName: userLastName,
//         password: password,
//         email:email
//     }
//     dataList.push(userObj);
//     localStorage.setItem('users',JSON.stringify(dataList));
//     dispatch({
//         type: 'getUserList'
//     })
// }