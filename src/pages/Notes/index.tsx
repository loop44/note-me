import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import DarkModeSvg from '../../assets/icons/dark-mode.svg';
import LogOutSvg from '../../assets/icons/log-out.svg';
import PlusSvg from '../../assets/icons/plus.svg';
import SearchSvg from '../../assets/icons/search.svg';
import LogoSvg from '../../assets/images/logo-icon.svg';

import {
  ContentHeader,
  Greeting,
  Note,
  NotePopup,
  NotesContent,
  NotesGrid,
  NotesWrapper,
  Sidebar
} from './Notes.elements';

const Notes = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const notePopupRef = useRef<HTMLTextAreaElement>(null);

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== notePopupRef.current) {
      setSelectedId(null);
    }
  };

  return (
    <NotesWrapper>
      <Sidebar>
        <img src={LogoSvg} width={48} alt="" />
        <img src={PlusSvg} width={32} alt="" />
        <img src={LogOutSvg} width={32} alt="" />
      </Sidebar>
      <NotesContent>
        <ContentHeader>
          <div className="input">
            <img src={SearchSvg} alt="" />
            <input type="text" placeholder="Search Notes" />
          </div>
          <img src={DarkModeSvg} alt="" />
        </ContentHeader>
        <Greeting>
          <h1>
            Hello, <span>Loop</span>
            <span>!</span> 👋🏼
          </h1>
          <p>All your notes are here, in one place!</p>
        </Greeting>
        <NotesGrid>
          {items.map((item) => (
            <Note
              key={item}
              as={motion.div}
              layoutId={String(item)}
              onClick={() => setSelectedId(String(item))}
            >
              <div>
                This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍
              </div>
              <p>Feb, 10 2022</p>
            </Note>
          ))}
        </NotesGrid>
      </NotesContent>
      <div
        onClick={closePopup}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
        className={`${selectedId ? 'visible' : ''} back`}
      >
        <AnimatePresence>
          {selectedId && (
            <NotePopup as={motion.div} layoutId={selectedId}>
              <div className="content">
                <textarea
                  ref={notePopupRef}
                  defaultValue="This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍"
                />
              </div>
            </NotePopup>
          )}
        </AnimatePresence>
      </div>
    </NotesWrapper>
  );
};

export default Notes;
