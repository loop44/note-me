import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { NotePopupElement } from './Notes.elements';

interface NotePopupProps {
  closePopup: (e: React.MouseEvent<HTMLDivElement>) => void;
  opened: boolean;
  text: string;
  id: string;
  notePopupRef: React.RefObject<HTMLTextAreaElement>;
  popupOverlayRef: React.RefObject<HTMLDivElement>;
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
  popupOverlayRef,
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

  const [textValue, setTextValue] = useState<string>(text);

  const onChangeTextValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1000) {
      setTextValue(e.target.value);
    }
  };

  return (
    <div
      onClick={closePopup}
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
      className={`${opened ? 'visible' : ''} notePopupOverlay`}
      ref={popupOverlayRef}
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
                id={id}
                placeholder="Type your note here"
                ref={notePopupRef}
                value={textValue}
                onChange={onChangeTextValue}
              />
            </div>
            <span>{textValue.length}/1000</span>
          </NotePopupElement>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotePopup;
