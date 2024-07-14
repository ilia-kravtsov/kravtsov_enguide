import s from '../styles/components/Header.module.scss'
import {NavigationBar} from "./NavigationBar.tsx";

type Props = {}

export const Header = ({}: Props) => {
    return (
        <div className={s.container}>
            <NavigationBar/>
        </div>
    );
};

