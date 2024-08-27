import s from '../styles/components/Expressions.module.scss'
import {SaveButton} from "./SaveButton.tsx";
import {ChangeEvent, useState} from "react";
import {ComplexityLevels} from "./InputData.tsx";

type Props = {}

export const Expressions = ({}: Props) => {

    let [expressionData, setExpressionData] = useState<any>({id: '', expression: '', transcription: '', translation: ''})
    const complexityLevels: ComplexityLevels[]  =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const expressionEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, expression: e.currentTarget.value})
    }
    const transcriptionEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, transcription: e.currentTarget.value})
    }
    const translationEntering = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionData({...expressionData, translation: e.currentTarget.value})
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (complexityLevels.some(level => level === value)) {
            setExpressionData({ ...expressionData, complexity: value as ComplexityLevels });
        }
    }

    return (
        <div className={s.container}>
            <h2>Enter your new expression</h2>
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
                <fieldset  className={s.complexityContainer}>
                    <legend>Complexity of the expression:</legend>
                    {complexityLevels.map((level) => (
                        <label key={level} className={s.complexityLabel}>
                            <input
                                type="radio"
                                value={level}
                                name="complexity"
                                checked={expressionData.complexity === level}
                                onChange={handleCategoryChange}
                            />
                            {level}
                        </label>
                    ))}
                </fieldset>
                <SaveButton onDateSaveClick={() => {
                }}/>
            </form>
            <h2>Expressions base</h2>
        </div>
    );
};

