import {InputData, WordData} from "./InputData.tsx";
import s from '../styles/components/Dictionary.module.scss';
import {getDatabase, ref, get, set} from "firebase/database";
import { app } from "../../firebase-config.ts";
import {useEffect, useState} from "react";
import {NewWordData, WordUpdate} from "./WordUpdate.tsx";
import {Word} from "./Word.tsx";

type ServerData = {
    [key: string]: WordData;
}

export type UpdateWord = {wordId: string, updateFlag: boolean}

type Props = {}

export const Dictionary = ({}: Props) => {

    let [dataLoadFlag, setDataLoadFlag] = useState<boolean>(false)
    let [data, setData] = useState<ServerData>()
    let [loadingWordsFlag, setLoadingWordsFlag] = useState<boolean>(false)
    let [updateWordFlag, setUpdateWordFlag] = useState<UpdateWord>({wordId: '', updateFlag: false})

    // получаю данные с сервера
    useEffect( () => {
        setLoadingWordsFlag(true)
        // создал асинхронную функцию для получения данных
        const fetchData = async () => {
            const db = getDatabase(app); // getting database
            const dbReference = ref(db, 'words'); // формирую ссылку для запроса
            const snapshot = await get(dbReference); // запрос
            if (snapshot.exists()) { // resolve
                const actualData = snapshot.val(); // данные в полном формате ассоциативного массива АМ
                setData(actualData)
                setLoadingWordsFlag(false)
            } else {
                alert("data hasn't been downloaded")
            }
        };
        fetchData();

    }, [dataLoadFlag])

    const onUpdateWordClick = (wordId: string) => {
        setUpdateWordFlag({wordId, updateFlag: true});
    }
    const onSaveWordClick = async (wordId: string, updateFlag: boolean, newWordData: NewWordData) => {
        setLoadingWordsFlag(true)
        setUpdateWordFlag({wordId, updateFlag});
        const db = getDatabase(app);
        const dbReference = ref(db, 'words/'+wordId);
        set(dbReference, {
            word: newWordData.word,
            translation: newWordData.translation,
            transcription: newWordData.transcription,
        }).then(() => {
            setLoadingWordsFlag(false)
        alert('updated succussfully')
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <div className={s.container}>
            <h2>Enter your new word</h2>
            <InputData setDataLoadFlag={setDataLoadFlag}/>
            <h2>Dictionary</h2>
            <ul>
                {loadingWordsFlag
                    ? <div className={s.loadingWords}>Loading...</div>
                    : data && Object.entries(data).map(([key, wordData]) => {
                    console.log(wordData)
                        return (
                            <li key={key} className={s.wordContainer}>
                                <div className={s.wordMainInfo}>
                                    {
                                        updateWordFlag?.updateFlag && key === updateWordFlag.wordId
                                            ? <WordUpdate wordId={key} wordData={wordData} onSaveWordClick={onSaveWordClick}/>
                                            : <Word wordId={key} wordData={wordData} onUpdateWordClick={onUpdateWordClick}/>
                                    }
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

/*
 {updateWordFlag?.updateFlag ? (
            <div>
                <textarea className={s.textareaCommentEdit}>{wordData.comment}</textarea>
                <button className={s.buttonCommentEdit} onClick={() => onSaveChangedComment(key)}>Save</button>
            </div>
        ) : (
            <div className={s.wordComment}>
                {wordData.comment}
            </div>
        )}

                        // тосую АМ в массив с объектами и добавляю внешюю id внутрь объекта
                // const dataWithIds = Object.keys(actualData).map(id => {
                //     return {
                //         ...actualData[id],
                //         id
                //     }
                // })
 */