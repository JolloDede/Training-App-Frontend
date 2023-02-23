import { ChangeEventHandler } from "react";

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    password?: boolean;
}

function TextInput({ value, password, onChange }: Props) {
    let classname = "block w-full p-2.5 text-gray-900 bg-gray-50 border border-gray-900 rounded-lg";
    if (password)
        return ( <input type="password" value={value} onChange={onChange} className={classname} /> );
    return ( 
        <input type="text" value={value} onChange={onChange} className={classname}  />
     );
}

export default TextInput;