import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const findCreateSelectAtom = atom({
  key: 'findCreateSelectAtom',
  default: 0,
});
