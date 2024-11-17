import React from 'react';
import * as style from './menu.module.scss'
import * as svg from "@/styles/icons/menuIcons.module.scss";
import CloseSvg from "../../../public/assets/svg/close.svg";
import Button from "@/components/smallComponents/button/button";

interface MenuType {
    onClose: () => void
}

const Menu: React.FC<MenuType> = ({onClose}) => {

    return (
        <div className={style.menuContainer}>
            <Button classType={'White'} onClick={()=> {onClose();}}>
                <CloseSvg className={svg.menuIcons}/>
            </Button>
            <h1>Game 1!</h1>
        </div>
    );
};

export default Menu;