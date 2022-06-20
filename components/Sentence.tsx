import React, {useEffect, useRef, useState} from "react";
import {Sentence} from "../hooks/recoil/sentences";
import {useTranslate} from "../hooks/recoil/deepl";

export const SentenceBox: React.FC<{
  sentence: Sentence
}> = ({ sentence }) => {
  const div = useRef<HTMLDivElement>(null);
  const translate = useTranslate();

  const [translated, setTranslated] = useState<string | undefined>(sentence.language === 'EN' ? undefined : sentence.original);
  const [reverseTranslated, setReverseTranslated] = useState<string | undefined>(undefined);

  useEffect(() => {
    div.current?.scrollIntoView();
  }, [div.current]);

  useEffect(() => {
    translate(sentence.original, { targetLanguage: 'JA' })
      .then(setTranslated)
      .catch(console.error);
  }, [sentence, setReverseTranslated]);

  useEffect(() => {
    if (translated) {
      translate(translated, { targetLanguage: 'EN' })
        .then(setReverseTranslated)
        .catch(console.error);
    }
  }, [translated, setReverseTranslated]);

  return (
    <div className="flex w-full py-3 border-t-2 first:border-t-0" ref={div}>
      <div className="w-1/2">
        {sentence.language === 'EN' && (
          <p className="text-slate-900">
            {sentence.original}
          </p>
        )}
        <p className="text-slate-500">
          {translated || '...'}
        </p>
      </div>
      <div className="px-4 flex items-center">
        →
      </div>
      <p className="w-1/2 text-slate-900">
        {reverseTranslated || '...'}
      </p>
    </div>
  );
};
