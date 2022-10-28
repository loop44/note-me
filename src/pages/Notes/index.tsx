import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { v4 } from 'uuid';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import axiosInctance from '../../api/axios';
import closeSvg from '../../assets/icons/close.svg';
import DarkModeSvg from '../../assets/icons/dark-mode.svg';
import LightModeSvg from '../../assets/icons/light-mode.svg';
import LogOutSvg from '../../assets/icons/log-out.svg';
import LogOutSvgDark from '../../assets/icons/log-out-dark.svg';
import PlusSvg from '../../assets/icons/plus.svg';
import PlusSvgDark from '../../assets/icons/plus-dark.svg';
import PlusMobile from '../../assets/icons/plus-mobile.svg';
import PlusMobileDark from '../../assets/icons/plus-mobile-dark.svg';
import SearchSvg from '../../assets/icons/search.svg';
import LogoSvg from '../../assets/images/logo-icon.svg';
import LogoSvgDark from '../../assets/images/logo-icon-dark.svg';
import { Error } from '../Autorization/Autorization.elements';

import {
  ContentHeader,
  Greeting,
  Note,
  NotesContent,
  NotesGrid,
  NotesWrapper,
  Sidebar
} from './Notes.elements';
import SortableNote from './SortableNote';
import Trash from './Trash';

interface NoteProps {
  logOut: () => void;
  name: string;
  isAnonymous: boolean;
}

type NoteType = {
  id: string;
  content: string;
  index: number;
  date: string;
  color: string;
};

const Notes: React.FC<NoteProps> = ({ logOut, name, isAnonymous }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [items, setItems] = useState<NoteType[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const theme = {
    main: darkTheme ? 'dark' : 'light'
  };

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem('darkTheme', String(!darkTheme));
  };

  // server requests
  const createNote = async (id: string, index: number, date: string, color: string) => {
    try {
      await axiosInctance.post('/api/notes', {
        id,
        content: '',
        index,
        date,
        color
      });
    } catch {
      setError('An error occurred. Please try again later :(');
    }
  };

  const getNotes = async () => {
    try {
      const res = await axiosInctance.get('api/notes');

      const orderNotes = res.data.sort((a: NoteType, b: NoteType) => b.index - a.index);
      setItems(orderNotes);
    } catch {
      setError('An error occurred. Please try again later :(');
    }
  };

  const updateNote = async (id: string, content: string) => {
    try {
      await axiosInctance.put(`/api/notes/${id}`, {
        content
      });
    } catch {
      setError('An error occurred. Please try again later :(');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axiosInctance.delete(`api/notes/${id}`);
    } catch {
      setError('An error occurred. Please try again later :(');
    }
  };

  const updateIndexes = async (indexes: string[]) => {
    try {
      await axiosInctance.put(`api/notes/`, {
        indexes
      });
    } catch {
      setError('An error occurred. Please try again later :(');
    }
  };

  useEffect(() => {
    if (!isAnonymous) {
      getNotes();
    }
    const darkThemeLocalStorage = localStorage.getItem('darkTheme');
    if (darkThemeLocalStorage) {
      setDarkTheme(darkThemeLocalStorage === 'true');
    }
  }, []);

  const addItem = () => {
    const id = v4();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    const date = new Date().toLocaleDateString('en-US', options);

    const colors = ['#FDF6D2', '#D5ECE1', '#E2DBEA', '#D4D4D4', '#FFC8C3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    setItems([{ id, content: '', index: items.length, date, color }, ...items]);
    if (!isAnonymous) {
      createNote(id, items.length, date, color);
    }
  };

  const changeNote = (value: string, id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        if (item.content !== value) {
          if (!isAnonymous) {
            updateNote(item.id, value);
          }
        }
        item.content = value;
      }

      return item;
    });

    setItems(newItems);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(String(active.id));

    items.forEach((item) => {
      if (item.id === active.id) {
        setSelectedText(item.content);
        setSelectedDate(item.date);
        setSelectedColor(item.color);
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setItems((notes) => {
        const indexes = notes.map((n) => n.id);
        const oldIndex = indexes.indexOf(String(active.id));
        const newIndex = indexes.indexOf(String(over.id));
        const newNotes = arrayMove(notes, oldIndex, newIndex);
        const newIndexes = newNotes.map((n) => n.id).reverse();

        if (!isAnonymous) {
          updateIndexes(newIndexes);
        }
        return newNotes;
      });
    }

    if (over.id === 'trash') {
      const newItems = items.filter((item) => {
        if (item.id === active.id) {
          if (!isAnonymous) {
            deleteNote(item.id);
          }
          return false;
        }

        return true;
      });

      setItems(newItems);
    }

    setActiveId(null);
    setSelectedText('');
  };

  const filteredItems = items.filter((obj) => {
    if (obj.content.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <ThemeProvider theme={theme}>
      <NotesWrapper>
        <Sidebar>
          {darkTheme ? (
            <>
              <img className="logoIcon" src={LogoSvgDark} width={48} alt="" />
              <input type="image" width={32} src={PlusSvgDark} alt="" onClick={addItem} />
              <input type="image" width={32} src={LogOutSvgDark} alt="" onClick={logOut} />
            </>
          ) : (
            <>
              <img className="logoIcon" src={LogoSvg} width={48} alt="" />
              <input type="image" width={32} src={PlusSvg} alt="" onClick={addItem} />
              <input type="image" width={32} src={LogOutSvg} alt="" onClick={logOut} />
            </>
          )}
        </Sidebar>
        <NotesContent>
          <ContentHeader>
            <div className="input">
              <img src={SearchSvg} alt="" />
              <input
                type="text"
                placeholder="Search Notes"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
              />
            </div>
            {darkTheme ? (
              <>
                <input
                  className="logOutMobile"
                  type="image"
                  width={24}
                  src={LogOutSvgDark}
                  alt=""
                  onClick={logOut}
                />
                <input type="image" src={LightModeSvg} alt="" onClick={changeTheme} />
              </>
            ) : (
              <>
                <input
                  className="logOutMobile"
                  type="image"
                  width={24}
                  src={LogOutSvg}
                  alt=""
                  onClick={logOut}
                />
                <input type="image" src={DarkModeSvg} alt="" onClick={changeTheme} />
              </>
            )}
          </ContentHeader>
          <Greeting>
            <h1>
              Hello
              {name && (
                <>
                  <span>,</span> <span className="bold">{name}</span>
                </>
              )}
              <span className="bold">!</span>
              👋🏼
            </h1>
            <p>All your notes are here, in one place!</p>
          </Greeting>
          <NotesGrid>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              measuring={{
                droppable: { strategy: MeasuringStrategy.Always }
              }}
            >
              <SortableContext items={filteredItems} strategy={rectSortingStrategy}>
                {filteredItems.map((item) => (
                  <SortableNote
                    key={item.id}
                    id={item.id}
                    changeNote={changeNote}
                    text={item.content}
                    style={{
                      backgroundColor: item.color
                    }}
                  >
                    {item.content ? (
                      <div>{item.content}</div>
                    ) : (
                      <div className="placeholder">Type your note here</div>
                    )}
                    <p>{item.date}</p>
                  </SortableNote>
                ))}
              </SortableContext>
              <Trash id="trash" activeId={activeId} />
              <DragOverlay>
                {activeId ? (
                  <Note
                    id={activeId}
                    as={motion.div}
                    className="dragOverlay"
                    style={{
                      backgroundColor: selectedColor
                    }}
                  >
                    {selectedText ? (
                      <div>{selectedText}</div>
                    ) : (
                      <div className="placeholder">Type your note here</div>
                    )}
                    <p>{selectedDate}</p>
                  </Note>
                ) : null}
              </DragOverlay>
            </DndContext>
          </NotesGrid>
        </NotesContent>
        <AnimatePresence mode="wait">
          {error && (
            <Error
              as={motion.div}
              initial={{ y: '-5rem' }}
              animate={{ y: '1.563rem' }}
              exit={{ y: '-5rem' }}
            >
              <div>
                <span>{error}</span>
                <input type="image" src={closeSvg} alt="" onClick={() => setError(null)} />
              </div>
            </Error>
          )}
        </AnimatePresence>
        {darkTheme ? (
          <input
            className="plusMobile"
            type="image"
            width={60}
            src={PlusMobileDark}
            alt=""
            onClick={addItem}
          />
        ) : (
          <input
            className="plusMobile"
            type="image"
            width={60}
            src={PlusMobile}
            alt=""
            onClick={addItem}
          />
        )}
      </NotesWrapper>
    </ThemeProvider>
  );
};

export default Notes;
