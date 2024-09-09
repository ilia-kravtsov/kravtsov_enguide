import s from '../styles/components/Expressions.module.scss'
import {Expression, InputExpressionData} from "./InputExpressionData.tsx";
import {useEffect, useState} from "react";
import {get, getDatabase, ref, remove, set} from "firebase/database";
import {app} from "../../firebase-config.ts";
import Snackbar from "@mui/material/Snackbar";
import {alphabet} from "./Dictionary.tsx";
import {ExpressionUpdate} from "./ExpressionUpdate.tsx";
import {ExpressionComponent} from "./ExpressionComponent.tsx";

export type UpdateExpression = { expressionId: string, updateFlag: boolean }

type ServerData = {
    [key: string]: Expression;
}

type Props = {}

export const Expressions = ({}: Props) => {

    let [expressionsData, setExpressionsData] = useState<ServerData>({})
    let [fetchActivating, setFetchActivating] = useState({})
    let [loadingExpressionsFlag, setLoadingExpressionsFlag] = useState<boolean>(false)
    let [notification, setNotification] = useState<string>('');
    let [updateExpressionFlag, setUpdateExpressionFlag] = useState<UpdateExpression>({expressionId: '', updateFlag: false})

    // получаю данные с сервера
    useEffect(() => {
        setLoadingExpressionsFlag(true)
        // создал асинхронную функцию для получения данных
        const fetchData = async () => {
            const db = getDatabase(app); // getting database
            const dbReference = ref(db, 'enguide/expressions'); // формирую ссылку для запроса
            const snapshot = await get(dbReference); // запрос
            if (snapshot.exists()) { // resolve
                const actualData = snapshot.val(); // данные в полном формате ассоциативного массива АМ
                console.log(actualData)
                setExpressionsData(actualData)
            } else {
                setNotification("data hasn't been downloaded")
            }
            setLoadingExpressionsFlag(false)
        };
        fetchData();
    }, [fetchActivating])

    const notificationClose = () => setNotification('');
    const saveExpressionClick = async (expressionId: string, updateFlag: boolean, newExpressionData: Expression) => {
            setLoadingExpressionsFlag(true)
            setUpdateExpressionFlag({expressionId, updateFlag});

            const db = getDatabase(app);
            const wordRef = ref(db, "enguide/expressions/" + expressionId);

            const newWordServerData: Expression = {
                expression: newExpressionData.expression,
                translation: newExpressionData.translation,
                transcription: newExpressionData.transcription,
                example: newExpressionData.example,
                comment: newExpressionData.comment,
                synonyms: newExpressionData.synonyms,
                memorizationLevel: newExpressionData.memorizationLevel,
                complexity: newExpressionData.complexity,
            }

            set(wordRef, newWordServerData).then(() => {
                setNotification('updated successfully')
                setFetchActivating({})
            }).catch((error) => {
                setNotification(`${error.message}`)
            }).finally(() => {

            })
    }

    const sortedExpressions = Object.entries(expressionsData).sort(([, expressionDataA], [, expressionDataB]) => {
        return expressionDataA.expression.localeCompare(expressionDataB.expression);
    });

    const onUpdateExpressionClick = (expressionId: string) => {
        setUpdateExpressionFlag({expressionId, updateFlag: true});
    }
    const deleteWordClick = async (expressionId: string) => {
        const db = getDatabase(app); // getting database
        const dbReference = ref(db, 'enguide/expressions/' + expressionId); // формирую ссылку для запроса
        await remove(dbReference).then(() => {
            setNotification('removed successfully')
            const copyData: ServerData = {...expressionsData}
            delete copyData[expressionId];
            setExpressionsData(copyData);
        }).catch((error) => {
            setNotification(error.message)
        }).finally(() => {
        })
    }

    return (
        <div className={s.container}>
            <h2>Enter your new expression</h2>
            <InputExpressionData setFetchActivating={setFetchActivating}/>
            <h2>Expressions base</h2>
            {loadingExpressionsFlag
                ? <div className={s.loading}>Loading...</div>
                : alphabet.map((letter) => {
                    const expressionsWithLetter = sortedExpressions.filter(([_, expressionData]) => expressionData.expression[0].toLowerCase() === letter);

                    return expressionsWithLetter.length > 0 && (
                        <div key={letter}>
                            {/* Render the starting letter header */}
                            <h2 className={s.firstLetter}>{letter.toUpperCase()}</h2>
                            {expressionsWithLetter.map(([key, expressionData]) => (
                                <li key={key} className={s.wordContainer}>
                                    {
                                        updateExpressionFlag?.updateFlag && key === updateExpressionFlag.expressionId ? (
                                            <ExpressionUpdate expressionId={key} expressionData={expressionData}
                                                        onSaveWordClick={saveExpressionClick}/>
                                        ) : (
                                            <ExpressionComponent expressionId={key} expressionData={expressionData}
                                                                 onUpdateExpressionClick={onUpdateExpressionClick}
                                                                 deleteExpressionCB={deleteWordClick}/>
                                        )
                                    }
                                </li>
                            ))}
                        </div>
                    );
                })
            }
            {sortedExpressions.length === 0 && <div className={s.loading}>Enter your first expression</div>}
            {!!notification && <Snackbar open={!!notification}
                                         autoHideDuration={6000}
                                         onClose={notificationClose}
                                         message={notification}/>
            }
        </div>
    );
};

