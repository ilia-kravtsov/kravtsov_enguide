import s from '../styles/components/Input.module.scss';
import {ChangeEvent, KeyboardEvent, SyntheticEvent, useState} from "react";
import {getDatabase, ref, set, push} from "firebase/database";
// @ts-ignore
import { app } from "../../firebase-config.ts";
import {v4} from 'uuid';
import {SaveButton} from "./SaveButton.tsx";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";

export type ComplexityLevels = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type PartsOfSpeech = 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Pronoun' | 'Preposition' | 'Conjunction' | 'Interjection';
export type WordData = {
    id: string
    word: string
    transcription: string
    translation: string
    example: string
    complexity: ComplexityLevels
    pos: PartsOfSpeech
    comment: string
    synonyms: string
};

type Props = {
    setFetchActivating: ({}) => void
}

export const partsOfSpeech: PartsOfSpeech[] = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Pronoun', 'Preposition', 'Conjunction', 'Interjection'];

export const InputData = ({setFetchActivating}: Props) => {

    const complexityLevels: ComplexityLevels[]  =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    let [data, setData] = useState<WordData>({id: '', word: '', transcription: '', translation: '', example: '', complexity: 'A1', pos: 'Noun', comment: '', synonyms: ''})
    let [notification, setNotification] = useState<string>('');

    const WordEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, word: e.currentTarget.value})
    }
    const TranscriptionEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, transcription: e.currentTarget.value})
    }
    const TranslationEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, translation: e.currentTarget.value})
    }
    const exampleEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, example: e.currentTarget.value})
    }
    const commentEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, comment: e.currentTarget.value})
    }
    const synonymEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, synonyms: e.currentTarget.value})
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (complexityLevels.some(level => level === value)) {
            setData({ ...data, complexity: value as ComplexityLevels });
        }
    }
    const changingPartsOfSpeechHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (partsOfSpeech.some(level => level === value)) {
            setData({ ...data, pos: value as PartsOfSpeech });
        }
    }
    const onDateSaveClick = async () => {
        if (data.word.length > 0 && data.transcription.length > 0) {
        const db = getDatabase(app);
        const newWordReference = push(ref(db, 'enguide/words'));
            console.log(data)
            // готовлю данные
            const id = v4();
            const word = data.word;
            const transcription = data.transcription;
            const translation = data.translation;
            const usageExample = data.example;
            const complexity = data.complexity;
            const pos = data.pos;
            const example = data.example;
            const synonyms = data.synonyms;
            const comment = data.comment;

            // отправляю данные
            set(newWordReference, {
                id,
                word,
                transcription,
                translation,
                usageExample,
                complexity,
                pos,
                example,
                synonyms,
                comment
            }).then(() => {
                setNotification('a new word saved successfully');
                setFetchActivating({});
            }).catch((error) => {
                setNotification(`error: ${error}`);
            }).finally(() => {
                setData({id, word: '', transcription: '', translation: '', example: '', comment: '', synonyms: '', complexity: 'A1', pos: 'Noun'})
            })
        } else {
            setNotification('fill in all the fields');
        }
    }
    const isKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onDateSaveClick()
        }
    }
    const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'escapeKeyDown') {
            return event;
        }
        setNotification('');
    };

    return (
        <form className={s.container}>
            <div className={s.inputsContainer}>
                <input className={s.input}
                       onChange={WordEntering}
                       value={data.word}
                       maxLength={50}
                       onKeyDown={isKeyEnter}
                       placeholder={'new word'}/>
                <input className={s.input}
                       onChange={TranscriptionEntering}
                       value={data.transcription}
                       maxLength={50}
                       onKeyDown={isKeyEnter}
                       placeholder={'transcription'}/>
            </div>
            <input className={s.input}
                   onChange={TranslationEntering}
                   value={data.translation}
                   maxLength={200}
                   onKeyDown={isKeyEnter}
                   placeholder={'translation'}/>
            <input className={s.input}
                   onChange={exampleEntering}
                   placeholder={'usage example'}
                   maxLength={200}
                   onKeyDown={isKeyEnter}
                   value={data.example}/>
            <input className={s.input}
                   onChange={synonymEntering}
                   placeholder={'synonyms'}
                   maxLength={200}
                   onKeyDown={isKeyEnter}
                   value={data.synonyms}/>
            <input className={s.input}
                   onChange={commentEntering}
                   placeholder={'comment'}
                   maxLength={200}
                   onKeyDown={isKeyEnter}
                   value={data.comment}/>
            <fieldset className={s.complexityContainer}>
                <legend>Specify the complexity of the word :</legend>
                {complexityLevels.map((level) => (
                    <label key={level} className={s.complexityLabel}>
                        <input
                            type="radio"
                            value={level}
                            name="complexity"
                            checked={data.complexity === level}
                            onChange={handleCategoryChange}
                        />
                        {level}
                    </label>
                ))}
            </fieldset>
            <fieldset className={s.complexityContainer}>
                <legend>Parts of speech:</legend>
                {
                    partsOfSpeech.map((pos, i) => {
                        return <label htmlFor={pos} className={s.complexityLabel} key={pos}>
                            <input type="radio"
                                   id={pos}
                                   name="parts_of_speech"
                                   value={pos}
                                   onChange={changingPartsOfSpeechHandler}
                                   defaultChecked={i === 0}/>
                            {pos}
                        </label>
                    })
                }
            </fieldset>
            <SaveButton onDateSaveClick={onDateSaveClick}/>
            {!!notification && <Snackbar open={!!notification}
                                         autoHideDuration={6000}
                                         onClose={handleClose}
                                         message={notification}/>
            }
        </form>
    );
};

/*
    const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'escapeKeyDown') {
            return event;
        }
        setNotification('');
    };
 */