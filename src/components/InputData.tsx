import s from '../styles/components/Input.module.scss';
import {ChangeEvent, useState} from "react";
import {getDatabase, ref, set, push} from "firebase/database";
// @ts-ignore
import { app } from "../../firebase-config.ts";
import {v4} from 'uuid';

type ComplexityLevels = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

type Data = {
    id: string, word: string, transcription: string, translation: string, comment?: string, complexity: ComplexityLevels
}

type Props = {
    setDataLoadFlag: (dataLoadFlag: boolean) => void
}

export const InputData = ({setDataLoadFlag}: Props) => {

    const complexityLevels: ComplexityLevels[]  =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    let [data, setData] = useState<Data>({id: '', word: '', transcription: '', translation: '', comment: '', complexity: 'A1'})

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

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (complexityLevels.some(level => level === value)) {
            setData({ ...data, complexity: value as ComplexityLevels });
        }
    }

    const onDateSaveClick = async () => {
        const db = getDatabase(app);
        const newWordReference = push(ref(db, 'words'));
        if (data.word.length > 0 && data.transcription.length > 0) {

            // готовлю данные
            const id = v4();
            const word = data.word;
            const transcription = data.transcription;
            const translation = data.translation;
            const comment = data.comment;
            const complexity = data.complexity

            // отправляю данные
            set(newWordReference, {
                id,
                word,
                transcription,
                translation,
                comment,
                complexity
            }).then(() => {
                alert('a new word saved successfully');
                setDataLoadFlag(true)
            }).catch((error) => {
                alert(`error: ${error}`);
            }).finally(() => {
                setData({id, word: '', transcription: '', translation: '', comment: '', complexity: 'A1'})
            })
        } else {
            alert('fill in all the fields');
        }
    }

    return (
        <form className={s.container}>
            <div className={s.inputsContainer}>
                <input className={s.input} onChange={WordEntering} value={data.word} maxLength={50}
                       placeholder={'new word'}/>
                <input className={s.input} onChange={TranscriptionEntering} value={data.transcription} maxLength={50}
                       placeholder={'transcription'}/>
            </div>
            <input className={s.input} onChange={TranslationEntering} value={data.translation} maxLength={500}
                   placeholder={'translation'}/>
            <textarea className={s.textarea} onChange={CommentEntering} placeholder={'usage example'} rows={5}
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
                <legend>Word formation:</legend>
                <label htmlFor="noun" className={s.complexityLabel}>
                    <input type="radio" id="noun" name="word_formation" value="noun" defaultChecked={true}/>
                    Noun
                </label>
                <label htmlFor="verb" className={s.complexityLabel}>
                    <input type="radio" id="verb" name="word_formation" value="verb"/>
                    Verb
                </label>
                <label htmlFor="adjective" className={s.complexityLabel}>
                    <input type="radio" id="adjective" name="word_formation" value="adjective"/>
                    Adjective
                </label>
                <label htmlFor="adverb" className={s.complexityLabel}>
                    <input type="radio" id="adverb" name="word_formation" value="adverb"/>
                    Adverb
                </label>
            </fieldset>
            <button className={s.saveButton} onClick={onDateSaveClick} type={'button'}>Save</button>
        </form>
    );
};

