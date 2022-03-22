import { ButtonHTMLAttributes } from "react"

const Standard : React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} >
            {props.children}
        </button>
    )
}

export const Buttons = {
    Standard: Standard
}