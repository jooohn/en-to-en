import type {NextPage} from 'next'
import Head from 'next/head'
import {TextInput} from "../components/TextInput";
import {useAddSentence, useSentences} from "../hooks/recoil/sentences";
import {SentenceBox} from "../components/Sentence";
import {DeeplKeyButton} from "../components/DeeplKeyButton";

const Home: NextPage = () => {
  const sentences = useSentences();
  const addSentence = useAddSentence();

  return (
    <div className="flex content-center items-center flex-col flex-1 w-full h-full px-8">
      <Head>
        <title>en-to-en</title>
        <meta name="description" content="English to English" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex content-center items-center flex-col flex-grow w-full overflow-y-auto">
        <div className="flex w-full my-8 flex-none">
          <TextInput onSubmit={sentence => addSentence(sentence)}/>
          <div className="ml-1">
            <DeeplKeyButton/>
          </div>
        </div>

        <div className="w-full flex-grow overflow-y-auto">
          {sentences.map((sentence) => (
            <SentenceBox key={sentence.id} sentence={sentence}/>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
