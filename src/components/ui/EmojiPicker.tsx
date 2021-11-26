import styled from "styled-components";
import OutsideClickDetector from "./OutsideClickDetector";
import { emojiDictionary } from "../../assets/emojis";
import Emoji from "../common/Emoji";
import { FixedSizeGrid } from "react-window";
import {JSXInternal} from "preact/src/jsx";
import {Ref, StateUpdater} from "preact/compat";

const emojiPadding = 7,
    emojiSize = 25,
    emojisPerRow = 7,
    basePaddingRem = 0.5,
    baseSizeRem = 18.75
;

const EmojiPickerEmojiBase = styled.div`
    padding: ${emojiPadding}px;
    cursor: pointer;
    user-select: none;
  
    :active {
        opacity: 0.5;
        transform: scale(0.9);
    }
`;

interface EmojiCellProps {
    columnIndex: number;
    rowIndex: number;
    style: JSXInternal.CSSProperties;
    draft: string;
    setDraft: StateUpdater<string>;
    selectionPoint: number;
    onCloseRequested(): void;
}

function EmojiCell(props: EmojiCellProps) {
    const emojiName = Object.keys(emojiDictionary)[props.rowIndex * emojisPerRow + props.columnIndex];
    const emoji = (emojiDictionary as Record<string, string>)[emojiName];

    function addEmoji() {
        const emojiToInject = `:${emojiName}:`;

        const newDraft = [
            props.draft.substring(0, props.selectionPoint),
            emojiToInject,
            props.draft.substring(props.selectionPoint, props.draft.length)
        ].join("")

        props.setDraft(newDraft)
        props.onCloseRequested()
    }

    return (
        <EmojiPickerEmojiBase style={props.style} onClick={addEmoji}>
            <Emoji emoji={emoji} size={emojiSize} />
        </EmojiPickerEmojiBase>
    )
}

const EmojiPickerBase = styled.div`
  position: absolute;
  right: 1rem;
  top: -1rem;
  padding: ${basePaddingRem}rem;
  transform: translateY(-100%);
  background-color: var(--background);
  border-radius: var(--border-radius);
`;

interface EmojiPickerProps {
    onCloseRequested(): void;
    draft: string;
    setDraft: StateUpdater<string>;
    selectionPoint: number;
}

export default function EmojiPicker(props: EmojiPickerProps) {
    const emojiNames = Object.keys(emojiDictionary);

    return (
        <OutsideClickDetector onCloseRequested={props.onCloseRequested}>
            <EmojiPickerBase>
                <FixedSizeGrid
                    columnWidth={emojiSize + emojiPadding * 2}
                    columnCount={emojisPerRow}
                    rowHeight={emojiSize + emojiPadding * 2}
                    height={(baseSizeRem - basePaddingRem * 2) * 16}
                    rowCount={Math.ceil(emojiNames.length / emojisPerRow)}
                    width={(baseSizeRem - basePaddingRem * 2) * 16}
                >
                    {({...cellProps}) => (
                        <EmojiCell
                            {...cellProps}
                            draft={props.draft}
                            setDraft={props.setDraft}
                            selectionPoint={props.selectionPoint}
                            onCloseRequested={props.onCloseRequested}
                        />
                    )}
                </FixedSizeGrid>
            </EmojiPickerBase>
        </OutsideClickDetector>
    )
}
