import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot} from "recoil";
import {useLoadDeeplKey} from "../hooks/recoil/deepl";
import React, {PropsWithChildren, useEffect} from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Loader>
        <Component {...pageProps} />
      </Loader>
    </RecoilRoot>
  );
}

const Loader: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const loadDeeplKey = useLoadDeeplKey();
  useEffect(() => {
    loadDeeplKey();
  }, []);
  return <>{children}</>;
};

export default MyApp
