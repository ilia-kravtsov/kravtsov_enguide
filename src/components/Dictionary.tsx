import {InputData} from "./InputData.tsx";
import s from '../styles/components/Dictionary.module.scss';
import {getDatabase, ref, get} from "firebase/database";
// @ts-ignore
import { app } from "../../firebase-config.ts";
import {useEffect, useState} from "react";

type Props = {}

export const Dictionary = ({}: Props) => {

    let [dataLoadFlag, setDataLoadFlag] = useState<boolean>(false)
    let [data, setData] = useState<Array<{ word: string, transcription: string, translation: string, comment: string}>>()
    let [editCommentFlag, setEditCommentFlag] = useState<boolean>(false)
    let [loadingWordsFlag, setLoadingWordsFlag] = useState<boolean>(false)
    let [idsArray, setIdsArray] = useState<Array<any>>([])

    // получаю данные с сервера
    useEffect( () => {
        setLoadingWordsFlag(true)
        // создал асинхронную функцию для получения данных
        const fetchData = async () => {
            const db = getDatabase(app); // getting database
            const dbReference = ref(db, 'words');
            const snapshot = await get(dbReference);
            if (snapshot.exists()) {

                // получение id для редактирования комментария
                const actualData = snapshot.val();
                const idsArray = Object.keys(actualData).map(id => {
                    return {
                        ...actualData[id],
                        id
                    }
                })
                setIdsArray(idsArray)
                setData(Object.values(snapshot.val()))
                setLoadingWordsFlag(false)
            } else {
                alert("data hasn't been downloaded")
            }
        };
        fetchData();

    }, [dataLoadFlag])

    const onCommentChangeClick = () => {
        setEditCommentFlag(true)
    }

    const onSaveChangedComment = () => {
        setEditCommentFlag(false)
    }

    return (
        <div className={s.container}>
            <h2>Enter your new word</h2>
            <InputData setDataLoadFlag={setDataLoadFlag}/>
            <h2>Dictionary</h2>
            <ul>
                {loadingWordsFlag
                    ? <div className={s.loadingWords}>Loading...</div>
                    : data?.map(((word, index) => {
                        return (
                            <li key={index} className={s.wordContainer}>
                                <div className={s.wordMainInfo}>
                                    <div className={s.word}>{word.word}</div>
                                    {editCommentFlag
                                        ? <div>
                                            <textarea className={s.textareaCommentEdit}>{word.comment}</textarea>
                                            <button className={s.buttonCommentEdit} onClick={onSaveChangedComment}>Save</button>
                                        </div>
                                        : <div className={s.wordComment} onClick={onCommentChangeClick}>
                                            {word.comment}
                                        </div>
                                    }
                                    -
                                    <div>{word.transcription}</div>-
                                    <div>{word.translation.toLowerCase()}</div>
                                </div>
                            </li>
                        )
                    }))
                }
            </ul>
        </div>
    );
};

