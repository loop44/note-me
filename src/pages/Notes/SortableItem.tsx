import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { v4 } from 'uuid';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Note, NotePopup } from './Notes.elements';

const SortableItem = ({ ...props }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [animateToken] = useState(v4());
  const notePopupRef = useRef<HTMLTextAreaElement>(null);

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
    if (e.target !== notePopupRef.current) {
      setOpened(false);
      props.changeNote(notePopupRef.current?.value, notePopupRef.current?.id);
    }
  };

  return (
    <>
      <div ref={setNodeRef} {...attributes} style={style} {...listeners}>
        <Note
          as={isDragging ? '' : motion.div}
          layoutId={String(animateToken)}
          onClick={() => setOpened(true)}
          animate={{ zIndex: 1 }}
        >
          {props.children}
        </Note>
      </div>
      <div
        onClick={closePopup}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
        className={`${opened ? 'visible' : ''} notePopupOverlay`}
      >
        <AnimatePresence>
          {opened && (
            <NotePopup as={motion.div} layoutId={String(animateToken)}>
              <div className="content">
                <textarea
                  ref={notePopupRef}
                  defaultValue={props.text}
                  id={props.id}
                  placeholder="Type your note here"
                />
              </div>
            </NotePopup>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SortableItem;
