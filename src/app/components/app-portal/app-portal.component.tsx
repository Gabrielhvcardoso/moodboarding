import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: React.ReactNode
}

export default function AppPortal({ children }: Props) {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector<HTMLElement>("#app-portal")
        setMounted(true);
    }, []);

    return (mounted && ref.current) ? createPortal(children, ref.current) : null;
}
