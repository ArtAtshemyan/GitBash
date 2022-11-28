import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {logDOM} from "@testing-library/react";

function Members() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type:'getUserList'
        })
    },[dispatch]);
    const dataList = useSelector((store)=>{return store.usersDataReducer.users});
    const [deleteUser,setDeleteUser] = useState({});


    return (
        <div>
            {dataList.map((item,index)=>{
                return(
                    <>
                        <div key={index}>{item.email}</div>
                    </>


                )
            })}
        </div>
    );
}

export default Members;