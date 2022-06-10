import {atom, useRecoilValue, useSetRecoilState} from "recoil";

const DEEPL_API_KEY = 'DEEPL_API_KEY'

const deeplKeyState = atom<string | undefined>({
  key: 'deeplKeyState',
  default: undefined,
});

export function useLoadDeeplKey(): () => void {
  const setDeeplKey = useSetRecoilState(deeplKeyState);
  return () => {
    const deeplApiKey = window.localStorage.getItem(DEEPL_API_KEY);
    if (deeplApiKey) {
      setDeeplKey(deeplApiKey);
    }
  }
}

export function useDeeplKey(): string | undefined {
  return useRecoilValue(deeplKeyState);
}

export function useSetDeeplKey(): (key: string | undefined) => void {
  const setDeeplKey = useSetRecoilState(deeplKeyState);
  return key => {
    if (key && key.length > 0) {
      window.localStorage.setItem(DEEPL_API_KEY, key);
    } else {
      window.localStorage.removeItem(DEEPL_API_KEY);
    }
    setDeeplKey(key);
  }
}

export function useTranslate(): (text: string, params: { targetLanguage: string }) => Promise<string> {
  const deeplKey = useDeeplKey();
  return async (text, { targetLanguage }) => {
    if (!deeplKey) {
      throw new Error('Deepl API Key is required.');
    }
    const form = new FormData();
    form.append('auth_key', deeplKey);
    form.append('text', text);
    form.append('target_lang', targetLanguage);
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      body: form,
    });
    if (response.ok) {
      const result = await response.json();
      return result.translations[0].text;
    } else {
      throw new Error(await response.text());
    }
  };
}
