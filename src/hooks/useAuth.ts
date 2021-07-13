import { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { sessionDataAtom } from '../store/authStore';
import {authenticate, Auth, SessionData} from "../services/Login";
import axios from "axios";

const useAuth = () => {
    const [user] = useRecoilState(sessionDataAtom);
    return user;
}


// Provider hook that creates auth object and handles state
function useProvideAuth() {

  const [user, setUserData] = useRecoilState(sessionDataAtom);

  const signin = (authData : Auth, callback?: (data:any) => void) => {

    authenticate(authData)
        .then(({data} : AxiosResponse<SessionData>) => {
            setUserData(data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            if (callback) callback(data);
        }).catch(e => {
            setUserData({
                'logged': false
            });
        })
  };

  const signout = () => {
    return setUserData({
        'logged': false
    });
  };


  // Return the user object and auth methods
  return {
    user,
    signin,
    signout
  };
}

export {useAuth, useProvideAuth};