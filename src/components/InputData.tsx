import s from '../styles/components/Input.module.scss';
import {ChangeEvent, useState} from "react";
import {getDatabase, ref, set, push} from "firebase/database";
// @ts-ignore
import { app } from "../../firebase-config.ts";

type Props = {
}

export const InputData = ({}: Props) => {

    let [word, setWord] = useState<string>('')
    let [transcription, setTranscription] = useState<string>('')

    const WordEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.currentTarget.value)
    }

    const TranscriptionEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setTranscription(e.currentTarget.value)
    }

    const onDateSaveClick = async () => {
        const db = getDatabase(app);
        const newWordReference = push(ref(db, 'words'));
        if (word.length > 0 && transcription.length > 0) {
            set(newWordReference, {
                word,
                transcription
            }).then(() => {
                alert('a new word saved successfully');
            }).catch((error) => {
                alert(`error: ${error}`);
            }).finally(() => {
                setWord('')
                setTranscription('')
            })
        } else {
            alert('fill in all the fields');
        }
    }

    return (
        <div className={s.container}>
            <input className={s.input} onChange={WordEntering} value={word} maxLength={50} placeholder={'new word'}/>
            <input className={s.input} onChange={TranscriptionEntering} value={transcription} maxLength={50} placeholder={'new word transcription'}/>
            <button className={s.saveButton} onClick={onDateSaveClick}>Save</button>
        </div>
    );
};

