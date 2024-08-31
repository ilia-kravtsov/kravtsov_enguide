import s from "../styles/components/WordUpdate.module.scss";
import {ChangeEvent, useState} from "react";
import {WordData} from "./InputData.tsx";

export type NewWordData = { word: string, transcription: string, translation: string }

type Props = {
    wordId: string
    wordData: WordData
    onSaveWordClick: (wordId: string, updateFlag: boolean, newWordData: NewWordData) => void
}

export const WordUpdate = ({wordData, wordId, onSaveWordClick}: Props) => {

    let [data, setData] = useState<WordData>({id: wordId, word: wordData.word, transcription: wordData.transcription, translation: wordData.translation, example: wordData.example, complexity: wordData.complexity, pos: wordData.pos, comment: wordData.comment, synonyms: wordData.synonyms})

    const onSaveChangedComment = () => {
        const newWordData = {
            id: data.id,
            word: data.word,
            transcription: data.transcription,
            translation: data.translation,
            example: data.example,
            complexity: data.complexity,
            pos: data.pos,
            comment: data.comment,
            synonyms: data.synonyms,
        }
        onSaveWordClick(wordId, false, newWordData);
    }
    const changeWord = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, word: e.currentTarget.value})
    }
    const changeTranscription = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, transcription: e.currentTarget.value})
    }
    const changeTranslation = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, translation: e.currentTarget.value})
    }
    const changeExample = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, example: e.currentTarget.value})
    }
    const changeSynonyms = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, synonyms: e.currentTarget.value})
    }
    const changeComment = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, comment: e.currentTarget.value})
    }

    return (
        <div className={s.wordUpdatedInfo}>
            <div className={s.wordInfoContainer}>
                <input value={data.word}
                       onChange={changeWord}
                       className={s.updatedWordInput}/> -
                <input value={data.transcription}
                       onChange={changeTranscription}
                       className={s.updatedWordInput}/>-
                <input value={data.translation}
                          onChange={changeTranslation}
                          className={s.updatedWordInput}/>
            </div>
            <div className={s.wordAccordionContainer}>
                <input value={data.example}
                       onChange={changeExample}
                       className={s.updatedWordInput}/>
                <input value={data.synonyms}
                       onChange={changeSynonyms}
                       className={s.updatedWordInput}/>
                <input value={data.comment}
                       onChange={changeComment}
                       className={s.updatedWordInput}/>
            </div>
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