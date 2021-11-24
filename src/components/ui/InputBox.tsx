import styled, { css } from "styled-components";
import {useEffect, useRef} from "preact/compat";
import {RefObject} from "preact";

interface Props {
    readonly contrast?: boolean;
    focusOnLoad?: boolean;
}

const InputBoxBase = styled.input<Props>`
    z-index: 1;
    font-size: 1rem;
    padding: 8px 16px;
    border-radius: var(--border-radius);

    font-family: inherit;
    color: var(--foreground);
    background: var(--primary-background);
    transition: 0.2s ease background-color;

    border: none;
    outline: 2px solid transparent;
    transition: outline-color 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
        background: var(--secondary-background);
    }

    &:focus {
        box-shadow: 0 0 0 1.5pt var(--accent);
    }

    ${(props) =>
        props.contrast &&
        css`
            color: var(--secondary-foreground);
            background: var(--secondary-background);

            &:hover {
                background: var(--hover);
            }
        `
    }
`;

export default function InputBox(props: Props) {
    const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;

    useEffect(() => {
        if (props.focusOnLoad)
            inputRef.current?.focus();
    })

    return <InputBoxBase {...props} ref={inputRef} />
}
