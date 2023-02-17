import { MouseEventHandler } from "react";

interface Props {
    children?: React.ReactNode;
    classname?: string;
    key?: number;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

function Card({ children, classname, key, onClick }: Props) {
    return ( 
        <div key={key} onClick={onClick} className={"flex border rounded-lg p-4 my-1 "+classname}>
            {children}
        </div>
     );
}

export default Card;