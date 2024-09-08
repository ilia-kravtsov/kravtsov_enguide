import s from "../styles/components/PartsOfSpeech.module.scss";
import {partsOfSpeech, WordData} from "./InputData.tsx";
import {ChangeEvent} from "react";

type Props = {
    data: WordData
    changingPartsOfSpeechHandlerCB: (e: ChangeEvent<HTMLInputElement>) => void
    wordFlag: boolean
}

export const PartsOfSpeechComponent = ({data, changingPartsOfSpeechHandlerCB, wordFlag}: Props) => {

    const changingPartsOfSpeechHandler = (e: ChangeEvent<HTMLInputElement>) => changingPartsOfSpeechHandlerCB(e)

    return (
        <fieldset className={wordFlag ? s.posWordContainer : s.posContainer}>
            <legend>Parts of speech:</legend>
            {
                partsOfSpeech.map((pos) => {
                    return <label className={wordFlag ? s.posWordLabel : s.posLabel} key={pos}>
                        <input type="radio"
                               name="parts_of_speech"
                               value={pos}
                               onChange={changingPartsOfSpeechHandler}
                               checked={data.pos === pos}/>
                        {pos}
                    </label>
                })
            }
        </fieldset>
    );
};

