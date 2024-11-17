import * as style from './app.module.scss';
import React, {useState} from "react";
import Menu from "@/components/menu/menu";
import MenuSvg from "../../public/assets/svg/menu2.svg";
import * as svg from '@/styles/icons/menuIcons.module.scss';
import Button from "@/components/smallComponents/button/button";
import GameField from "@/components/gameField/gameField";
import StatsField from "@/components/statsField/statsField";


const App: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    console.log('PLATFORM -- ' + __PLATFORM__);
    if (__ENV__ === 'development') {
        console.log('cheats on');
    }

    const onCloseWindow = () => {
        setIsVisible(false);
    }

    const onOpenWindow = () => {
        setIsVisible(true);
    }

    return (
        <div className={style.app}>


            <div>
                {
                    isVisible && <Menu onClose={onCloseWindow} />
                }
                {
                    !isVisible &&
                    <Button onClick={onOpenWindow} classType={'White'}><MenuSvg className={svg.menuIcons}/></Button>
                }
            </div>

            <GameField/>
            <StatsField/>

        </div>
    );
};

export default App;