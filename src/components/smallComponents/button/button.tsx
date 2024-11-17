import React, {FC} from 'react';
import * as styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classType?: string;
}

const Button: FC<ButtonProps> = ({classType, children, ...props}) => {


    return (
        <button className={`${styles.button} ${styles[`button-${classType}`]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;