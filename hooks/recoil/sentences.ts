import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {v4} from "uuid";
import {SpeechLanguage} from "../../components/properties";

export type Sentence = {
  id: string
  language: SpeechLanguage,
  original: string
}

export function buildSentence(language: SpeechLanguage, original: string): Sentence {
  return {
    id: v4(),
    language,
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

export function useAddSentence(): (language: SpeechLanguage, original: string) => void {
  const setSentence = useSetRecoilState(sentencesState);
  return (language, original) => setSentence(sentences => [...sentences, buildSentence(language, original)]);
}
