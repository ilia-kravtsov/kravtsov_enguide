import s from "../styles/components/ComplexityLevelsComponent.module.scss";
import {complexityLevels, WordData} from "./InputWordData.tsx";
import {ChangeEvent} from "react";
import {Expression} from "./InputExpressionData.tsx";

type Props = {
    data: WordData | Expression
    handleCategoryChangeCB: (e: ChangeEvent<HTMLInputElement>) => void
    reduceFlag: boolean
    title?: string
}

export const ComplexityLevelsComponent = ({data, handleCategoryChangeCB, reduceFlag, title}: Props) => {

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => handleCategoryChangeCB(e)


    return (
        <fieldset className={reduceFlag ? s.complexityWordContainer : s.complexityContainer}>
            <legend>{title ? title : "Specify the complexity of the word:"}</legend>
            {complexityLevels.map((level) => (
                <label key={level} className={reduceFlag ? s.complexityWordLabel : s.complexityLabel}>
                    <input
                        type="radio"
                        name="complexity"
                        value={level}
                        checked={data.complexity === level}
                        onChange={handleCategoryChange}
                    />
                    {level}
                </label>
            ))}
        </fieldset>
    );
};

