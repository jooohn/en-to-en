import React, {useEffect, useState} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {useAddSentence} from "../hooks/recoil/sentences";
import {Button} from "./atom/Button";
import {SpeechLanguage, speechLanguages} from "./properties";

export const SpeechRecognitionContainer: React.FC = () => {
  const [active, setActive] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState<SpeechLanguage>('EN');
  const { listening, finalTranscript, transcript } = useSpeechRecognition({
    clearTranscriptOnListen: true,
  });
  const addSentence = useAddSentence();

  useEffect(() => {
    if (active) {
      if (!listening) {
        SpeechRecognition.startListening({
          continuous: false,
          language: speechLanguage,
        }).catch(console.error);
      }
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening, active]);
  useEffect(() => {
    if (0 < finalTranscript.length) {
      addSentence(speechLanguage, finalTranscript);
    }
  }, [speechLanguage, finalTranscript])

  return (
    <>
      <fieldset className="flex">
        <select
          value={speechLanguage}
          onChange={e => setSpeechLanguage(e.target.value as SpeechLanguage)}
          className="mr-2 w-full px-4 border-4 rounded-xl"
        >
          {speechLanguages.map(language => (
            <option key={language} value={language}>{language} to EN</option>
          ))}
        </select>
      </fieldset>
      <Button
        color={active ? 'error' : 'primary'}
        onClick={() => setActive(!active)}
        className="w-40"
      >
        {active ? 'STOP' : 'START'}
      </Button>
      <p className="flex-grow ml-2 flex content-center text-gray-500">
        {transcript}
      </p>
    </>
  );
};
