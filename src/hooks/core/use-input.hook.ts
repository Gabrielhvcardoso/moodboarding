import { ChangeEventHandler, useRef, useState } from "react";

export function useInput(initialValue: string) {
    const ref = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>(initialValue);

    const onChange: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = (event) => {
        setValue(event.target.value);
    };

    return {
        ref,
        value,
        onChange
    };
}
