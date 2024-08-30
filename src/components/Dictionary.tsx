import {InputData, WordData} from "./InputData.tsx";
import s from '../styles/components/Dictionary.module.scss';
import {get, getDatabase, ref, remove, set} from "firebase/database";
import {app} from "../../firebase-config.ts";
import {useEffect, useState} from "react";
import {NewWordData, WordUpdate} from "./WordUpdate.tsx";
import {Word} from "./Word.tsx";
import Snackbar from "@mui/material/Snackbar";

type ServerData = {
    [key: string]: WordData;
}

export type UpdateWord = { wordId: string, updateFlag: boolean }

type Props = {}

type Alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' |
    'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

const alphabet: Alphabet[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export const Dictionary = ({}: Props) => {

    let [data, setData] = useState<ServerData>({})
    let [loadingWordsFlag, setLoadingWordsFlag] = useState<boolean>(false)
    let [fetchActivating, setFetchActivating] = useState({})
    let [updateWordFlag, setUpdateWordFlag] = useState<UpdateWord>({wordId: '', updateFlag: false})
    let [notification, setNotification] = useState<string>('')

    // получаю данные с сервера
    useEffect(() => {
        setLoadingWordsFlag(true)
        // создал асинхронную функцию для получения данных
        const fetchData = async () => {
            const db = getDatabase(app); // getting database
            const dbReference = ref(db, 'enguide/words'); // формирую ссылку для запроса
            const snapshot = await get(dbReference); // запрос
            if (snapshot.exists()) { // resolve
                const actualData = snapshot.val(); // данные в полном формате ассоциативного массива АМ
                setData(actualData)
            } else {
                setNotification("data hasn't been downloaded")
            }
            setLoadingWordsFlag(false)
        };
        fetchData();
    }, [fetchActivating])

    const updateWordClick = (wordId: string) => {
        setUpdateWordFlag({wordId, updateFlag: true});
    }
    const saveWordClick = async (wordId: string, updateFlag: boolean, newWordData: NewWordData) => {
        setLoadingWordsFlag(true)
        setUpdateWordFlag({wordId, updateFlag});
        const db = getDatabase(app);
        const dbReference = ref(db, 'enguide/words/' + wordId);
        set(dbReference, {
            word: newWordData.word,
            translation: newWordData.translation,
            transcription: newWordData.transcription,
        }).then(() => {
            setNotification('updated successfully')
        }).catch((error) => {
            alert(error.message)
        }).finally(() => {

        })
    }
    const deleteWordClick = async (wordId: string) => {
        const db = getDatabase(app); // getting database
        const dbReference = ref(db, 'enguide/words/' + wordId); // формирую ссылку для запроса
        await remove(dbReference).then(() => {
            setNotification('removed successfully')
            const copyData: ServerData = {...data}
            delete copyData[wordId];
            setData(copyData);
        }).catch((error) => {
            setNotification(error.message)
        }).finally(() => {
        })
    }
    const notificationClose = () => setNotification('');

    const sortedWords = Object.entries(data).sort(([, wordDataA], [, wordDataB]) => {
        return wordDataA.word.localeCompare(wordDataB.word);
    });

    return (
        <div className={s.container}>
            <h2>Enter your new word</h2>
            <InputData setFetchActivating={setFetchActivating}/>
            <h2>Dictionary</h2>
            <ul>
                {loadingWordsFlag ? (
                    <div className={s.loadingWords}>Loading...</div>
                ) : (
                    // Loop through the alphabet array to render words grouped by their starting letter
                    alphabet.map((letter) => {
                        // Filter words that start with the current letter
                        const wordsWithLetter = sortedWords.filter(([_, wordData]) => wordData.word[0].toLowerCase() === letter);

                        // Only render if there are words starting with the current letter
                        return wordsWithLetter.length > 0 && (
                            <div key={letter}>
                                {/* Render the starting letter header */}
                                <h2>{letter.toUpperCase()}</h2>
                                {wordsWithLetter.map(([key, wordData]) => (
                                    <li key={key} className={s.wordContainer}>
                                        {
                                            updateWordFlag?.updateFlag && key === updateWordFlag.wordId ? (
                                                <WordUpdate wordId={key} wordData={wordData}
                                                            onSaveWordClick={saveWordClick}/>
                                            ) : (
                                                <Word wordId={key} wordData={wordData}
                                                      onUpdateWordClick={updateWordClick}
                                                      deleteWordCB={deleteWordClick}/>
                                            )
                                        }
                                    </li>
                                ))}
                            </div>
                        );
                    })
                )}
            </ul>
            {!!notification && <Snackbar open={!!notification}
                                         autoHideDuration={6000}
                                         onClose={notificationClose}
                                         message={notification}/>
            }
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

                 <div className={s.container}>
            <h2>Enter your new word</h2>
            <InputData setDataLoadFlag={setDataLoadFlag} flag={loadingWordsFlag}/>
            <h2>Dictionary</h2>
            <ul>
                {loadingWordsFlag
                    ? <div className={s.loadingWords}>Loading...</div>
                    : data && Object.entries(data).map(([key, wordData]) => {

                        alphabet.map((letter) => {
                            const firstLetter: string = wordData.word[0].toLowerCase();
                            if (letter === firstLetter) {

                            }
                        })

                        return (
                            <li key={key} className={s.wordContainer}>
                                <div className={s.wordMainInfo}>
                                    {
                                        updateWordFlag?.updateFlag && key === updateWordFlag.wordId
                                            ? <WordUpdate wordId={key} wordData={wordData} onSaveWordClick={saveWordClick}/>
                                            : <Word wordId={key} wordData={wordData} onUpdateWordClick={updateWordClick} deleteWordCB={deleteWordClick}/>
                                    }
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            {!!notification && <Snackbar open={!!notification}
                             autoHideDuration={6000}
                             onClose={notificationClose}
                             message={notification}/>
            }
        </div>
 */