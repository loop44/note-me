import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
import LogOutSvg from '../../assets/icons/log-out.svg';
import PlusSvg from '../../assets/icons/plus.svg';
import SearchSvg from '../../assets/icons/search.svg';
import LogoSvg from '../../assets/images/logo-icon.svg';
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
}

type NoteType = {
  id: string;
  content: string;
  index: number;
  date: string;
};

const Notes: React.FC<NoteProps> = ({ logOut, name }) => {
  const [items, setItems] = useState<NoteType[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  // server requests
  const createNote = async (id: string, index: number, date: string) => {
    try {
      await axiosInctance.post('/api/notes', {
        id,
        content: '',
        index,
        date
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
    getNotes();
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
    setItems([{ id, content: '', index: items.length, date }, ...items]);
    createNote(id, items.length, date);
  };

  const changeNote = (value: string, id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        if (item.content !== value) {
          updateNote(item.id, value);
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

        updateIndexes(newIndexes);
        return newNotes;
      });
    }

    if (over.id === 'trash') {
      const newItems = items.filter((item) => {
        if (item.id === active.id) {
          deleteNote(item.id);
          return false;
        }

        return true;
      });

      setItems(newItems);
    }

    setActiveId(null);
    setSelectedText('');
  };

  return (
    <NotesWrapper>
      <Sidebar>
        <img src={LogoSvg} width={48} alt="" />
        <input type="image" width={32} src={PlusSvg} alt="" onClick={addItem} />
        <input type="image" width={32} src={LogOutSvg} alt="" onClick={logOut} />
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
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map((item) => (
                <SortableNote
                  key={item.id}
                  id={item.id}
                  changeNote={changeNote}
                  text={item.content}
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
              <AnimatePresence>
                {activeId ? (
                  <Note
                    id={activeId}
                    as={motion.div}
                    className="dragOverlay"
                    animate={{ boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.3)' }}
                    exit={{ boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.3)' }}
                  >
                    {selectedText ? (
                      <div>{selectedText}</div>
                    ) : (
                      <div className="placeholder">Type your note here</div>
                    )}
                    <p>{selectedDate}</p>
                  </Note>
                ) : null}
              </AnimatePresence>
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
    </NotesWrapper>
  );
};

export default Notes;
