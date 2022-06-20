import React, {useEffect, useState} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {useAddSentence} from "../hooks/recoil/sentences";
import {Button} from "./atom/Button";

export const SpeechRecognitionContainer: React.FC = () => {
  const [active, setActive] = useState(false);
  const { listening, finalTranscript, transcript } = useSpeechRecognition({
    clearTranscriptOnListen: true,
  });
  const addSentence = useAddSentence();

  useEffect(() => {
    if (active) {
      if (!listening) {
        SpeechRecognition.startListening({
          continuous: false,
        }).catch(console.error);
      }
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening, active]);
  useEffect(() => {
    if (0 < finalTranscript.length) {
      addSentence(finalTranscript);
    }
  }, [finalTranscript])

  return (
    <>
      <Button
        color={active ? 'error' : 'primary'}
        onClick={() => setActive(!active)}
        className="w-40"
      >
        {active ? 'STOP' : 'START'}
      </Button>
      <p className="flex-grow ml-2 flex align-center text-gray-500">
        {transcript}
      </p>
    </>
  );
};
