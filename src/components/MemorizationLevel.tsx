import s from "../styles/components/MemorizationLevel.module.scss";
import {Memorization, memorizationLevels} from "./InputWordData.tsx";
import {ChangeEvent} from "react";

type Props = {
    handleMemoryLevelChangeCB: (e: ChangeEvent<HTMLInputElement>) => void
    defaultChecked: Memorization
}

export const MemorizationLevel = ({defaultChecked, handleMemoryLevelChangeCB}: Props) => {

    const handleMemoryLevelChange = (e: ChangeEvent<HTMLInputElement>) => handleMemoryLevelChangeCB(e)



    return (
        <fieldset className={s.memoryLevelContainer}>
            <legend>Specify the level of memorization:</legend>
            {memorizationLevels.map((level) => {

                const memoryStyles = level === 'passive memory' ? s.passiveMemory : level === 'active memory' ? s.activeMemory : '';

                return <label key={level} className={s.memoryLevelLabel}>
                    <input
                        type="radio"
                        name="memorization"
                        value={level}
                        checked={defaultChecked === level}
                        onChange={handleMemoryLevelChange}
                    />
                    <span className={memoryStyles}>{level}</span>
                </label>
            })}
        </fieldset>
    );
};

