import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './HomePage.css'
import {useNavigate} from "react-router-dom";
import Members from "../../components/addingUsers/Members";
import {useDispatch, useSelector} from "react-redux";
import Projects from "../../components/projects/Projects";
import {useParams} from "react-router-dom";

function HomePage() {
    const {emails} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        dispatch({
            type: 'getUserList'
        })
    }, [dispatch]);
    const dataList = useSelector((store) => {
        return store.usersDataReducer.users
    });

    const goToForms = useCallback(() => {
        navigate(`/addMember/${emails}`)
    }, [])

    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        for (let user of dataList) {
            if (String(user.email) === String(emails)) {
                console.log(user)
                return setCurrentUser(user);
            }
        }
    }, [dataList, emails, currentUser]);
    const CurrentInfo = useMemo(() => {
        if (Object.keys(currentUser).length) {
            return (<span className={'header__list circle'}>{String(currentUser.name[0].toUpperCase())}
                {String(currentUser.lastName[0].toUpperCase())}</span>)
        }
    }, [currentUser])

    return (
        <div className={'wrapper'}>
            <div className="header">
                <button className={'btn'} onClick={goToForms}>Back</button>
                <div className="header__block ">
                    {CurrentInfo}
                </div>
            </div>
            <div className="asaid">
                <div className={'desc'}>
                    <h4>Description</h4>
                    <input type={'text'} className={'desc__input'} placeholder={'Click to add team description'}/>
                    <hr/>
                </div>
                <div className={'add__members'}>
                    <div className={'members__header'}>
                        <button className={'add_members__btn'} onClick={goToForms}>+</button>
                        <h5 className={'add__members__title'}>Add members</h5>
                    </div>
                    <div className={'members__content'}>
                        <Members/>
                    </div>
                </div>
                {isOpen && <div className={'signup'}>
                    <button className={'close__btn'}>X</button>
                </div>}
            </div>
            <div className="main">
                <Projects/>
            </div>
            <div className="clear"></div>
        </div>
    );
}

export default HomePage;