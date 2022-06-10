import React, {useState} from "react";

export const TextInput: React.FC<{
  onSubmit?: (text: string) => void
}> = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  return (
    <form
      className="w-full"
      onSubmit={e => {
        e.stopPropagation();
        e.preventDefault();
        setValue('');
        onSubmit?.(value);
      }}
    >
      <input
        type="text"
        className="border-4 focus:border-indigo-600 border-indigo-400 w-full h-full p-2 rounded-xl"
        value={value}
        placeholder="Type or dictate any sentence in English, hit the enter button"
        onCompositionEnd={() => {
          setValue('');
          onSubmit?.(value);
        }}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}
