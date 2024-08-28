import s from "../styles/components/WordUpdate.module.scss";
import {ChangeEvent, useState} from "react";
import {WordData} from "./InputData.tsx";

export type NewWordData = {word: string, transcription: string, translation: string}

type Props = {
    wordId: string
    wordData: WordData
    onSaveWordClick: (wordId: string, updateFlag: boolean, newWordData: NewWordData) => void
}

export const WordUpdate = ({wordData, wordId, onSaveWordClick}: Props) => {

    let [updatedWord, setUpdatedWord] = useState<string>(wordData.word)
    let [wordTranscription, setWordTranscription] = useState<string>(wordData.transcription)
    let [wordTranslation, setWordTranslation] = useState<string>(wordData.translation.toLowerCase())

    const onSaveChangedComment = () => {
        const newWordData = {
            word: updatedWord,
            transcription: wordTranscription,
            translation: wordTranslation
        }
        console.log(newWordData)
        onSaveWordClick(wordId, false, newWordData);
    }
    const changeWord = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedWord(e.currentTarget.value)
    }
    const changeTranscription = (e: ChangeEvent<HTMLInputElement>) => {
        setWordTranscription(e.currentTarget.value)
    }
    const changeTranslation = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setWordTranslation(e.currentTarget.value)
    }

    return (
        <div className={s.wordMainInfo}>
            <input value={updatedWord} onChange={changeWord} className={s.updatedWordInput}/> -
            <input value={wordTranscription} onChange={changeTranscription} className={s.updatedWordInput}/>-
            <textarea value={wordTranslation}
                      onChange={changeTranslation}
                      className={s.updatedWordTextarea}
            ></textarea>
            <button className={s.updateButton}
                    onClick={onSaveChangedComment}>Save
            </button>
        </div>
    );
};

/*
            <div className={s.updatePosContainer}>
                {pos.map((part, index) => (
                    <div key={index}
                         style={{
                             opacity: isOpen || index === 0 ? 1 : 0,
                             transition: 'opacity 0.5s'
                         }} // Условные стили для видимости и эффекта
                        // onClick={index === 0 ? handleFirstItemClick : () => {}} // Добавляем обработчик клика только на первый элемент
                         onClick={() => handleItemClick(part)} // Handle click for every item
                         className={s.updatePosItem}>
                        <input
                            id={`selectPart${index}`}
                            type="radio"
                            value={part} // Используем значение из массива для значения радио
                            name="selectPart"
                            className={s.updatePosRadio}
                            checked={selectedPart === part} // Проверяем, выбрана ли эта опция
                            onChange={handleChange} // Обработчик изменения
                        />
                       <label htmlFor={`selectPart${index}`} className={s.updatePosLabel}>{index === 0 && count > 0 ? selectedPart : part}</label>
<label htmlFor={`selectPart${index}`} className="updatePosLabel">
    {part}
</label>
</div>
))}
</div>
.updatePosContainer {
  position: absolute;
  left: -130px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  background: var(--bg-color-1);
  z-index: 2;
}
.updatePosItem {
  overflow: hidden;
  border: var(--border-color);
  cursor: pointer;
  padding: 5px;

}
.updatePosItem:not(:first-child) {
  opacity: 0;
}
.updatePosItem:hover {
  background: var(--bg-color-2);
}
.updatePosRadio {
  display: none;
}
.updatePosLabel {
  cursor: pointer;
}
 */