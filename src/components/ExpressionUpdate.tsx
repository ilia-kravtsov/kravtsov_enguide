import {Expression} from "./InputExpressionData.tsx";
import {ChangeEvent, useState} from "react";
import s from "../styles/components/WordUpdate.module.scss";
import {ComplexityLevelsComponent} from "./ComplexityLevelsComponent.tsx";
import {ComplexityLevels, complexityLevels} from "./InputWordData.tsx";

type Props = {
    expressionId: string
    expressionData: Expression
    onSaveWordClick: (expressionId: string, updateFlag: boolean, newExpressionData: Expression) => void
}

export const ExpressionUpdate = ({expressionId, expressionData, onSaveWordClick}: Props) => {

    let [data, setData] = useState<Expression>({expression: expressionData.expression, transcription: expressionData.transcription, translation: expressionData.translation, example: expressionData.example, complexity: expressionData.complexity, comment: expressionData.comment, synonyms: expressionData.synonyms})

    const onSaveChangedComment = () => {
        const newWordData: Expression = {
            expression: data.expression,
            transcription: data.transcription,
            translation: data.translation,
            example: data.example,
            complexity: data.complexity,
            comment: data.comment,
            synonyms: data.synonyms,
        }
        onSaveWordClick(expressionId, false, newWordData);
    }

    const changeExpression = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, expression: e.currentTarget.value})
    }
    const changeTranscription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, transcription: e.currentTarget.value})
    }
    const changeTranslation = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, translation: e.currentTarget.value})
    }
    const changeExample = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, example: e.currentTarget.value})
    }
    const changeSynonyms = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, synonyms: e.currentTarget.value})
    }
    const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData({...data, comment: e.currentTarget.value})
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (complexityLevels.some(level => level === value)) {
            setData({ ...data, complexity: value as ComplexityLevels });
        }
    }

    return (
        <div className={s.wordUpdatedInfo}>
            <div className={s.wordInfoContainer}>
                <textarea value={data.expression}
                       onChange={changeExpression}
                       className={s.updatedWordInput}/> -
                <textarea value={data.transcription}
                       onChange={changeTranscription}
                       className={s.updatedWordInput}/>-
                <textarea value={data.translation}
                       onChange={changeTranslation}
                       className={s.updatedWordInput}/>
            </div>
            <div className={s.wordAccordionContainer}>
                <textarea value={data.example}
                       onChange={changeExample}
                       className={s.updatedWordInput}/>
                <textarea value={data.synonyms}
                       onChange={changeSynonyms}
                       className={s.updatedWordInput}/>
                <textarea value={data.comment}
                       onChange={changeComment}
                       className={s.updatedWordInput}/>
            </div>
            <ComplexityLevelsComponent data={data} handleCategoryChangeCB={handleCategoryChange} reduceFlag={true}/>
            <button className={s.updateButton}
                    onClick={onSaveChangedComment}>Save
            </button>
        </div>
    );
};

