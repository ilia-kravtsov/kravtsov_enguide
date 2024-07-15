import s from '../styles/components/Input.module.scss';
import {ChangeEvent, useState} from "react";
import {getDatabase, ref, set, push} from "firebase/database";
// @ts-ignore
import { app } from "../../firebase-config.ts";

type Props = {
    setDataLoadFlag: (dataLoadFlag: boolean) => void
}

export const InputData = ({setDataLoadFlag}: Props) => {

    let [data, setData] = useState<{word: string, transcription: string, translation: string, comment?: string}>({word: '', transcription: '', translation: '', comment: ''})

    const WordEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, word: e.currentTarget.value})
    }

    const TranscriptionEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, transcription: e.currentTarget.value})
    }

    const TranslationEntering = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, translation: e.currentTarget.value})
    }

    const CommentEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, comment: e.currentTarget.value})
    }

    const onDateSaveClick = async () => {
        const db = getDatabase(app);
        const newWordReference = push(ref(db, 'words'));
        if (data.word.length > 0 && data.transcription.length > 0) {

            // готовлю данные
            const word = data.word;
            const transcription = data.transcription;
            const translation = data.translation;
            const comment = data.comment;

            // отправляю данные
            set(newWordReference, {
                word,
                transcription,
                translation,
                comment
            }).then(() => {
                alert('a new word saved successfully');
                setDataLoadFlag(true)
            }).catch((error) => {
                alert(`error: ${error}`);
            }).finally(() => {
                setData({word: '', transcription: '', translation: '', comment: ''})
            })
        } else {
            alert('fill in all the fields');
        }
    }

    return (
        <div className={s.container}>
            <div className={s.inputsContainer}>
                <input className={s.input} onChange={WordEntering} value={data.word} maxLength={50}
                       placeholder={'new word'}/>
                <input className={s.input} onChange={TranscriptionEntering} value={data.transcription} maxLength={50}
                       placeholder={'transcription'}/>
            </div>
            <input className={s.input} onChange={TranslationEntering} value={data.translation} maxLength={50}
                       placeholder={'translation'}/>
            <textarea className={s.textarea} onChange={CommentEntering} placeholder={'comment'} rows={5} value={data.comment}></textarea>
            <button className={s.saveButton} onClick={onDateSaveClick}>Save</button>
        </div>
    );
};

