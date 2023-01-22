import { ChangeEventHandler } from "react";

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

function TextInput({ value, onChange }: Props) {
    return ( 
        <input type="text" value={value} onChange={onChange} className="border border-zinc-200 rounded-lg"  />
     );
}

export default TextInput;