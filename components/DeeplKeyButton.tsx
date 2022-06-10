import React from "react";
import {useDeeplKey, useSetDeeplKey} from "../hooks/recoil/deepl";

export const DeeplKeyButton: React.FC = () => {
  const deeplKey = useDeeplKey();
  const setDeeplKey = useSetDeeplKey();
  return (
    <button
      type="button"
      className={`border-4 border-indigo-400 ${deeplKey ? 'bg-indigo-500' : 'bg-indigo-600'} hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl whitespace-nowrap`}
      onClick={() => {
        const input = prompt('Put your Deepl API Key');
        if (input) {
          setDeeplKey(input);
        }
      }}
    >
      {deeplKey ? 'DEEPL API KEY' : 'PUT YOUR DEEPL API KEY'}
    </button>
  )
};
