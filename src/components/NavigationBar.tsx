import s from '../styles/components/NavigationBar.module.scss'
import {NavLink} from "react-router-dom";

type Props = {}

export const NavigationBar = ({}: Props) => {
    return (
        <div className={s.container}>
            <NavLink to={'/'} className={s.link}>Home</NavLink>
            <NavLink to={'/dictionary'} className={s.link}>Dictionary</NavLink>
        </div>
    );
};

