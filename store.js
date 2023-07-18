import {atom} from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const favouritesAtom = atomWithStorage("fave",null);

export const  searchHistoryAtom =  atomWithStorage("history",null);
