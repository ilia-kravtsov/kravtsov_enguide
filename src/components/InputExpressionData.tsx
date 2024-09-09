import s from "../styles/components/Expressions.module.scss";
import {ComplexityLevelsComponent} from "./ComplexityLevelsComponent.tsx";
import {SaveButton} from "./SaveButton.tsx";
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {ComplexityLevels, complexityLevels, Memorization, memorizationLevels} from "./InputWordData.tsx";
import {getDatabase, push, ref, set} from "firebase/database";
import {app} from "../../firebase-config.ts";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import {MemorizationLevel} from "./MemorizationLevel.tsx";

export type Expression = {
    expression: string,
    transcription: string,
    translation: string,
    example: string,
    comment: string
    synonyms: string
    memorizationLevel: Memorization
    complexity: ComplexityLevels
}

type Props = {
    setFetchActivating: ({}) => void
}

export const InputExpressionData = ({setFetchActivating}: Props) => {

    let [expressionData, setExpressionData] = useState<Expression>({expression: '', transcription: '', translation: '', example: '', comment: '', synonyms: "", memorizationLevel: 'unfamiliar', complexity: 'A1'})
    let [notification, setNotification] = useState<string>('');

    const expressionEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, expression: e.currentTarget.value})
    }
    const transcriptionEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, transcription: e.currentTarget.value})
    }
    const translationEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, translation: e.currentTarget.value})
    }
    const exampleEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, example: e.currentTarget.value})
    }
    const commentEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, comment: e.currentTarget.value})
    }
    const synonymsEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, synonyms: e.currentTarget.value})
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (complexityLevels.some(level => level === value)) {
            setExpressionData({ ...expressionData, complexity: value as ComplexityLevels });
        }
    }
    const expressionSaveClick = async () => {

        if (expressionData.expression.length > 0) {
            const db = getDatabase(app);
            const newWordReference = push(ref(db, 'enguide/expressions'));

            // готовлю данные
            const newWordData: Expression = {
                expression: expressionData.expression,
                transcription: expressionData.transcription,
                translation: expressionData.translation,
                example: expressionData.example,
                synonyms: expressionData.synonyms,
                comment: expressionData.comment,
                memorizationLevel: expressionData.memorizationLevel,
                complexity: expressionData.complexity,
            }
            // console.log(newWordData)
            // отправляю данные
            set(newWordReference, newWordData).then(() => {
                setNotification('a new expression saved successfully');
                setFetchActivating({});
            }).catch((error) => {
                setNotification(`error: ${error}`);
            }).finally(() => {
                setExpressionData({expression: '', transcription: '', translation: '', example: '', comment: '', synonyms: '', memorizationLevel: 'unfamiliar', complexity: 'A1'})
            })
        } else {
            setNotification('fill in all the fields');
        }

        setExpressionData({expression: '', transcription: '', translation: '', example: '', comment: '', synonyms: "", memorizationLevel: 'unfamiliar', complexity: 'A1'})
    }

    const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'escapeKeyDown') {
            return event;
        }
        setNotification('');
    };

    const handleMemoryLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (memorizationLevels.some(level => level === value)) {
            setExpressionData({ ...expressionData, memorizationLevel: value as Memorization });
        }
    }

    return (
        <form className={s.form}>
            <textarea placeholder={'new expression'}
                      className={s.expressionEnter}
                      onChange={expressionEntering}
                      value={expressionData.expression}/>
            <textarea placeholder={'transcription'}
                      className={s.expressionEnter}
                      onChange={transcriptionEntering}
                      value={expressionData.transcription}/>
            <textarea placeholder={'translation'}
                      className={s.expressionEnter}
                      onChange={translationEntering}
                      value={expressionData.translation}/>
            <textarea placeholder={'example'}
                      className={s.expressionEnter}
                      onChange={exampleEntering}
                      value={expressionData.example}/>
            <textarea placeholder={'synonyms'}
                      className={s.expressionEnter}
                      onChange={synonymsEntering}
                      value={expressionData.synonyms}/>
            <textarea placeholder={'comment'}
                      className={s.expressionEnter}
                      onChange={commentEntering}
                      value={expressionData.comment}/>
            <MemorizationLevel handleMemoryLevelChangeCB={handleMemoryLevelChange} defaultChecked={expressionData.memorizationLevel}/>
            <ComplexityLevelsComponent data={expressionData}
                                       handleCategoryChangeCB={handleCategoryChange}
                                       reduceFlag={false}
                                       title={'Complexity of the expression'}/>
            <SaveButton onDateSaveClick={expressionSaveClick}/>
            {!!notification && <Snackbar open={!!notification}
                                         autoHideDuration={6000}
                                         onClose={handleClose}
                                         message={notification}/>
            }
        </form>
    );
};

