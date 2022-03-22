import cx from 'classnames';
import { CSSProperties, HTMLProps } from 'react';

export const HStack = (props) => {
    return (
    <div className={cx(
        "flex",
        props.className
    )}>
            { props.children }
        </div>
    )
};

export const VStack = (props : HTMLProps<HTMLElement>) => {
    return (
        <div className={cx(
            "flex flex-col",
            props.className
        )}>
            { props.children }
        </div>
    )
}