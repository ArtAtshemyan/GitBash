import {put,takeEvery} from 'redux-saga/effects'

function* fetchUserList (action){
    const userList = yield JSON.parse(localStorage.getItem('usersData'))
     yield put({
         type: 'setUserList',
         payload: userList
     })
}

function* userWatcher (){
    yield  takeEvery('getUserList',fetchUserList)

}
export  default  userWatcher;