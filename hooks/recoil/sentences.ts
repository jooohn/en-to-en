import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {v4} from "uuid";

export type Sentence = {
  id: string
  original: string
}

export function buildSentence(original: string): Sentence {
  return {
    id: v4(),
    original,
  };
}

const sentencesState = atom<Sentence[]>({
  key: 'sentencesState',
  default: [],
});

export function useSentences(): Sentence[] {
  return useRecoilValue(sentencesState);
}

export function useAddSentence(): (original: string) => void {
  const setSentence = useSetRecoilState(sentencesState);
  return original => setSentence(sentences => [...sentences, buildSentence(original)]);
}
