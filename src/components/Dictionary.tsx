import {InputData} from "./InputData.tsx";
import s from '../styles/components/Dictionary.module.scss'

type Props = {}

export const Dictionary = ({}: Props) => {

    return (
        <div className={s.container}>
            <h2>Dictionary</h2>
            <InputData/>
        </div>
    );
};

