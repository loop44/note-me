import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import NotePopup from './NotePopup';
import { Note } from './Notes.elements';

const SortableNote = ({ ...props }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const notePopupRef = useRef<HTMLTextAreaElement>(null);
  const popupOverlayRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
    transition: {
      duration: 450,
      easing: 'ease'
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
    transition
  };

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === popupOverlayRef.current) {
      setOpened(false);
      props.changeNote(notePopupRef.current?.value, notePopupRef.current?.id);
    }
  };

  return (
    <>
      <div ref={setNodeRef} {...attributes} style={style} {...listeners}>
        <Note
          as={motion.div}
          layoutId={String(props.id)}
          onClick={() => setOpened(true)}
          animate={opened ? { opacity: 0 } : { opacity: 1 }}
          style={props.style}
        >
          {props.children}
        </Note>
      </div>
      <NotePopup
        closePopup={closePopup}
        opened={opened}
        text={props.text}
        id={props.id}
        notePopupRef={notePopupRef}
        popupOverlayRef={popupOverlayRef}
        style={props.style}
      />
    </>
  );
};

export default SortableNote;
