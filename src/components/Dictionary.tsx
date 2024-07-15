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

    useEffect( () => {
        const fetchData = async () => {
            const db = getDatabase(app); // getting database
            const dbReference = ref(db, 'words');
            const snapshot = await get(dbReference);
            if (snapshot.exists()) {
                setData(Object.values(snapshot.val()))
            } else {
                alert("data hasn't been downloaded")
            }
        };

        fetchData();
        console.log('fetchData')
    }, [dataLoadFlag])

    console.log(data);

    return (
        <div className={s.container}>
            <h2>Enter your new word</h2>
            <InputData setDataLoadFlag={setDataLoadFlag}/>
            <h2>Dictionary</h2>
            <ul>
                {data?.map(((word, index) => {
                    return (
                        <li key={index} className={s.wordContainer}>
                            <div className={s.wordMainInfo}>
                                <div className={s.word}>{word.word}</div>
                                <div className={s.wordComment}>{word.comment}</div>-
                                <div>{word.transcription}</div>-
                                <div>{word.translation.toLowerCase()}</div>
                            </div>
                        </li>
                    )
                }))}
            </ul>
        </div>
    );
};

