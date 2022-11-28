import React, {useEffect} from 'react';
import './Form.css'
import SignIn from "../../components/signin/SignIn";
import IdGenerator from "../../components/utils/IdGenerator";

function Forms() {
    // useEffect(()=>{
    //     const userArr = [];
    //     const admin = {
    //         id:IdGenerator(),
    //         name:'admin',
    //         lastName: 'admin',
    //         email:'admin@gmail.com',
    //         password:'admin1'
    //     }
    //     userArr.push(admin)
    //     localStorage.setItem('usersData',JSON.stringify(userArr));
    // },[]);
    return (
        <div className="login-wrap">
            <div className="login-html">
                <input id="tab-1" type="radio" name="tab" className="sign-in"/>
                <label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/>
                <label htmlFor="tab-2" className="tab">registration</label>
                <div className="login-form">
                    <SignIn/>
                </div>
            </div>
        </div>
    )
}

export default Forms