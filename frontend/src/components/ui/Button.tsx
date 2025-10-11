type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps{
    variant: ButtonVariant;
    size: 'sm' | 'md' | 'lg';
    text : string;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
}

const variantStyles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
}
const defaultStyles = "px-4 py-2 rounded flex items-center gap-2 ";

const sizeStyles = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
}

export const Button = (props : ButtonProps)=>{
    return <button className={`  ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} onClick={props.onClick}>
        {props.startIcon} {props.text} 
    </button>
}

