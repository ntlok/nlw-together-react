import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isHoutlined?: boolean;
};

export function Button({ isHoutlined = false, ...props}: ButtonProps) {

    return (
        <button className={`button ${isHoutlined ? 'outlined' : ''}`} {...props} />
    )
}