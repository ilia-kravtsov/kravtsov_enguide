import {Expression} from "./InputExpressionData.tsx";
import {useState} from "react";
import s from "../styles/components/Word.module.scss";

type Props = {
    expressionId: string
    expressionData: Expression
    onUpdateExpressionClick: (expressionId: string) => void
    deleteExpressionCB: (expressionId: string) => void
}

export const ExpressionComponent = ({expressionId, expressionData, onUpdateExpressionClick, deleteExpressionCB}: Props) => {

    let [expressionAccordOpenFlag, setExpressionAccordOpenFlag] = useState<boolean>(false);

    const updateWordClick = () => onUpdateExpressionClick(expressionId)
    const deleteWord = () => deleteExpressionCB(expressionId)
    const wordAccordOpener = () => setExpressionAccordOpenFlag(!expressionAccordOpenFlag)

    return (
        <div className={s.wordMainInfo}>
            <div className={s.wordInfoContainer}>
                <div className={s.complexityExpression}>{expressionData.complexity}</div>
                <div className={s.word} onClick={wordAccordOpener}>{expressionData.expression}</div>
                -
                <div>{expressionData.transcription}</div> -
                <div>{expressionData.translation.toLowerCase()}</div>
                <button className={s.updateButton}
                        onClick={updateWordClick}>
                    Update
                </button>
                <button className={s.updateButton}
                        onClick={deleteWord}>
                    Delete
                </button>
            </div>
            {expressionAccordOpenFlag && <div className={s.wordAccordionContainer}>
              <div>example: {expressionData.example}</div>
              <div>synonyms: {expressionData.synonyms}</div>
              <div>comment: {expressionData.comment}</div>
            </div>}
        </div>
    );
};

