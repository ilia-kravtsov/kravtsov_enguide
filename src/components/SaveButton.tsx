import s from "../styles/components/SaveButton.module.scss";

type Props = {
    onDateSaveClick: () => void;
}

export const SaveButton = ({onDateSaveClick}: Props) => {
    return <button className={s.saveButton} onClick={onDateSaveClick} type={'button'}>Save</button>
};

