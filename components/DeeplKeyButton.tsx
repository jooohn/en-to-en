import React from "react";
import {useDeeplKey, useSetDeeplKey} from "../hooks/recoil/deepl";
import {Button} from "./atom/Button";

export const DeeplKeyButton: React.FC = () => {
  const deeplKey = useDeeplKey();
  const setDeeplKey = useSetDeeplKey();
  return (
    <Button
      type="button"
      color="normal"
      onClick={() => {
        const input = prompt('Put your Deepl API Key');
        if (input) {
          setDeeplKey(input);
        }
      }}
    >
      {deeplKey ? 'CHANGE DEEPL API KEY' : 'PUT YOUR DEEPL API KEY'}
    </Button>
  )
};
