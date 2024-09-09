import s from "../styles/components/WordUpdate.module.scss";
import {ChangeEvent, useState} from "react";
import {ComplexityLevels, complexityLevels, PartsOfSpeech, partsOfSpeech, WordData} from "./InputWordData.tsx";
import {PartsOfSpeechComponent} from "./PartsOfSpeechComponent.tsx";
import {ComplexityLevelsComponent} from "./ComplexityLevelsComponent.tsx";

type Props = {
    wordId: string
    wordData: WordData
    onSaveWordClick: (wordId: string, updateFlag: boolean, newWordData: WordData) => void
}

export const WordUpdate = ({wordData, wordId, onSaveWordClick}: Props) => {

    let [data, setData] = useState<WordData>({word: wordData.word, transcription: wordData.transcription, translation: wordData.translation, example: wordData.example, complexity: wordData.complexity, pos: wordData.pos, comment: wordData.comment, synonyms: wordData.synonyms})

    const onSaveChangedComment = () => {
        const newWordData: WordData = {
            word: data.word,
            transcription: data.transcription,
            translation: data.translation,
            example: data.example,
            complexity: data.complexity,
            pos: data.pos,
            comment: data.comment,
            synonyms: data.synonyms,
        }
        onSaveWordClick(wordId, false, newWordData);
    }
    const changeWord = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, word: e.currentTarget.value})
    }
    const changeTranscription = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, transcription: e.currentTarget.value})
    }
    const changeTranslation = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, translation: e.currentTarget.value})
    }
    const changeExample = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, example: e.currentTarget.value})
    }
    const changeSynonyms = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, synonyms: e.currentTarget.value})
    }
    const changeComment = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, comment: e.currentTarget.value})
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (complexityLevels.some(level => level === value)) {
            setData({ ...data, complexity: value as ComplexityLevels });
        }
    }
    const changingPartsOfSpeechHandlerCB = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (partsOfSpeech.some(level => level === value)) {
            setData({ ...data, pos: value as PartsOfSpeech });
        }
    }

    return (
        <div className={s.wordUpdatedInfo}>
            <div className={s.wordInfoContainer}>
                <input value={data.word}
                       onChange={changeWord}
                       className={s.updatedWordInput}/> -
                <input value={data.transcription}
                       onChange={changeTranscription}
                       className={s.updatedWordInput}/>-
                <input value={data.translation}
                          onChange={changeTranslation}
                          className={s.updatedWordInput}/>
            </div>
            <div className={s.wordAccordionContainer}>
                <input value={data.example}
                       onChange={changeExample}
                       className={s.updatedWordInput}/>
                <input value={data.synonyms}
                       onChange={changeSynonyms}
                       className={s.updatedWordInput}/>
                <input value={data.comment}
                       onChange={changeComment}
                       className={s.updatedWordInput}/>
            </div>
            <ComplexityLevelsComponent data={data} handleCategoryChangeCB={handleCategoryChange} reduceFlag={true}/>
            <PartsOfSpeechComponent data={data} changingPartsOfSpeechHandlerCB={changingPartsOfSpeechHandlerCB} wordFlag={true}/>
            <button className={s.updateButton}
                    onClick={onSaveChangedComment}>Save
            </button>
        </div>
    );
};

