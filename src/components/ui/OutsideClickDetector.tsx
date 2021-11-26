import {useEffect, useRef} from "preact/compat";
import {RefObject} from "preact";
import {Children} from "../../types/Preact";
import styled from "styled-components";

interface Props {
    children: Children;
    onCloseRequested(): void;
}

export default function OutsideClickDetector(props: Props) {
    const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;

    useEffect(() => {
        function handler(event: MouseEvent) {
            let clickedElement = event.target as Node;
            const wrapperChild = ref.current?.firstChild;

            let clickedOutside = true;
            do {
                if (wrapperChild === clickedElement)
                {
                    clickedOutside = false;
                    break;
                }

                clickedElement = clickedElement?.parentNode as Node;
            } while (clickedElement);

            if (clickedOutside)
                props.onCloseRequested()
        }

        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [props, ref])

    return <div ref={ref}>
        {props.children}
    </div>
}
