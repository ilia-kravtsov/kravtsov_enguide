import s from '../styles/components/Input.module.scss';
import {ChangeEvent, KeyboardEvent, SyntheticEvent, useState} from "react";
import {getDatabase, ref, set, push} from "firebase/database";
// @ts-ignore
import { app } from "../../firebase-config.ts";
import {SaveButton} from "./SaveButton.tsx";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import {ComplexityLevelsComponent} from "./ComplexityLevelsComponent.tsx";
import {PartsOfSpeechComponent} from "./PartsOfSpeechComponent.tsx";
import {MemorizationLevel} from "./MemorizationLevel.tsx";

export type ComplexityLevels = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type PartsOfSpeech = 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Pronoun' | 'Preposition' | 'Conjunction' | 'Interjection';
export type WordData = {
    word: string
    transcription: string
    translation: string
    example: string
    complexity: ComplexityLevels
    pos: PartsOfSpeech
    comment: string
    synonyms: string
    memorizationLevel: Memorization
};
export type Memorization = 'active memory' | 'passive memory' | 'unfamiliar'
type Props = {
    setFetchActivating: ({}) => void
}
export const complexityLevels: ComplexityLevels[]  =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const partsOfSpeech: PartsOfSpeech[] = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Pronoun', 'Preposition', 'Conjunction', 'Interjection'];
export const memorizationLevels: Memorization[] = ['unfamiliar', 'passive memory', 'active memory'];

export const InputWordData = ({setFetchActivating}: Props) => {

    let [data, setData] = useState<WordData>({word: '', transcription: '', translation: '', example: '', complexity: 'A1', pos: 'Noun', comment: '', synonyms: '', memorizationLevel: 'unfamiliar'})
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
    const handleMemoryLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (memorizationLevels.some(level => level === value)) {
            setData({ ...data, memorizationLevel: value as Memorization });
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
            const newWordData: WordData = {
                word: data.word,
                transcription: data.transcription,
                translation: data.translation,
                complexity: data.complexity,
                pos: data.pos,
                example: data.example,
                synonyms: data.synonyms,
                comment: data.comment,
                memorizationLevel: data.memorizationLevel
            }

            // отправляю данные
            set(newWordReference, newWordData).then(() => {
                setNotification('a new word saved successfully');
                setFetchActivating({});
            }).catch((error) => {
                setNotification(`error: ${error}`);
            }).finally(() => {
                setData({word: '', transcription: '', translation: '', example: '', comment: '', synonyms: '', complexity: 'A1', pos: 'Noun', memorizationLevel: 'unfamiliar'})
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
            <MemorizationLevel defaultChecked={data.memorizationLevel} handleMemoryLevelChangeCB={handleMemoryLevelChange}/>
            <ComplexityLevelsComponent data={data} handleCategoryChangeCB={handleCategoryChange} reduceFlag={false}/>
            <PartsOfSpeechComponent data={data} changingPartsOfSpeechHandlerCB={changingPartsOfSpeechHandler}
                                    wordFlag={false}/>
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