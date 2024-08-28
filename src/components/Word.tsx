import s from "../styles/components/Word.module.scss";
import {WordData} from "./InputData.tsx";

type Props = {
    wordId: string
    wordData: WordData
    onUpdateWordClick: (wordId: string, updateFlag: boolean) => void
}

export const Word = ({wordId, wordData, onUpdateWordClick}: Props) => {

    const updateWordClick = () => onUpdateWordClick(wordId, true)
    console.log(wordData)
    return (
        <div className={s.wordMainInfo}>
            <div className={s.complexity}>{wordData.complexity}</div>
            <div className={s.pos}>{wordData.pos}</div>
            <div className={s.word}>{wordData.word}</div>
            -
            <div>{wordData.transcription}</div> -
            <div>{wordData.translation.toLowerCase()}</div>
            <button className={s.updateButton}
                    onClick={updateWordClick}>Update
            </button>
        </div>
    );
};

