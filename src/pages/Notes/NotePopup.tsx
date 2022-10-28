import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { NotePopupElement } from './Notes.elements';

interface NotePopupProps {
  closePopup: (e: React.MouseEvent<HTMLDivElement>) => void;
  opened: boolean;
  text: string;
  id: string;
  notePopupRef: React.RefObject<HTMLTextAreaElement>;
  style: {
    backgroundColor: string;
  };
}

const NotePopup: React.FC<NotePopupProps> = ({
  closePopup,
  opened,
  text,
  id,
  notePopupRef,
  style
}) => {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [opened]);

  return (
    <div
      onClick={closePopup}
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
      className={`${opened ? 'visible' : ''} notePopupOverlay`}
    >
      <AnimatePresence>
        {opened && (
          <NotePopupElement
            style={style}
            key="modal"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="content">
              <textarea
                ref={notePopupRef}
                defaultValue={text}
                id={id}
                placeholder="Type your note here"
              />
            </div>
          </NotePopupElement>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotePopup;
