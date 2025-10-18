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
const defaultStyles =
  "relative px-4 py-2 rounded flex items-center justify-center gap-2  text-cyan-400 font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,255)] group";

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

