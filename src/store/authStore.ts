import {atom} from "recoil";
import { SessionData } from "../services/Login";

const sessionDataAtom = atom<SessionData>({
    key: 'sessionData',
    default: {
      'logged': false
    },
});

export {sessionDataAtom}