import s from "../styles/components/ComplexityLevelsComponent.module.scss";
import {complexityLevels, WordData} from "./InputData.tsx";
import {ChangeEvent} from "react";

type Props = {
    data: WordData
    handleCategoryChangeCB: (e: ChangeEvent<HTMLInputElement>) => void
    wordFlag: boolean
}

export const ComplexityLevelsComponent = ({data, handleCategoryChangeCB, wordFlag}: Props) => {

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => handleCategoryChangeCB(e)


    return (
        <fieldset className={wordFlag ? s.complexityWordContainer : s.complexityContainer}>
            <legend>Specify the complexity of the word :</legend>
            {complexityLevels.map((level) => (
                <label key={level} className={wordFlag ? s.complexityWordLabel : s.complexityLabel}>
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

