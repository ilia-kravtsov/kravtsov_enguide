import s from "../styles/components/Word.module.scss";
import {WordData} from "./InputWordData.tsx";
import {useState} from "react";

type Props = {
    wordId: string
    wordData: WordData
    onUpdateWordClick: (wordId: string) => void
    deleteWordCB: (wordId: string) => void
}

export const Word = ({wordId, wordData, onUpdateWordClick, deleteWordCB}: Props) => {

    let [wordAccordOpenFlag, setWordAccordOpenFlag] = useState<boolean>(false);

    const updateWordClick = () => onUpdateWordClick(wordId)
    const deleteWord = () => deleteWordCB(wordId)
    const wordAccordOpener = () => setWordAccordOpenFlag(!wordAccordOpenFlag)

    return (
        <div className={s.wordMainInfo}>
            <div className={s.wordInfoContainer}>
                <div className={s.complexity}>{wordData.complexity}</div>
                <div className={s.pos}>{wordData.pos}</div>
                <div className={s.word} onClick={wordAccordOpener}>{wordData.word}</div>
                -
                <div>{wordData.transcription}</div> -
                <div>{wordData.translation.toLowerCase()}</div>
                <button className={s.updateButton}
                        onClick={updateWordClick}>
                    Update
                </button>
                <button className={s.updateButton}
                        onClick={deleteWord}>
                    Delete
                </button>
            </div>
            {wordAccordOpenFlag && <div className={s.wordAccordionContainer}>
                <div>example: {wordData.example}</div>
                <div>synonyms: {wordData.synonyms}</div>
                <div>comment: {wordData.comment}</div>
            </div>}
        </div>
    );
};

