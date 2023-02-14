import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";

interface Props {
    placeholder: string;
    options: DropdownOption[];
    onChange: Function;
}

export interface DropdownOption {
    key: string;
    value: string;
}

const Icon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

function Dropdown({ placeholder, options, onChange }: Props) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState<DropdownOption | null>(null);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);

        return () => {
            window.addEventListener("click", handler);
        }
    })

    function getDisplay() {
        if (selectedValue) {
            return selectedValue.value
        }
        return placeholder;
    }

    function itemClickHandle(option: DropdownOption) {
        setSelectedValue(option);
        onChange(option);
    }

    function isSelected(option: DropdownOption): boolean {
        if (!selectedValue) {
            return false;
        }

        return selectedValue.value == option.value;
    }

    function handleClick(e: MouseEvent) {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    return (
        <div className="relative text-left border rounded-lg w-fit cursor-pointer">
            <div onClick={(e) => handleClick(e)} className="flex p-2">
                <div className="pr-3 font-semibold select-none">{getDisplay()}</div>
                <div>
                    <Icon />
                </div>
            </div>
            {showMenu && (
                <div className="absolute w-full max-h-[150px] translate-y-1 overflow-auto border rounded-lg bg-white">
                    {options.map((option) => (
                        <div key={option.key} onClick={() => itemClickHandle(option)} className={"p-2 hover:bg-blue-300 "+ (isSelected(option) && "bg-blue-500")}>
                            {option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;