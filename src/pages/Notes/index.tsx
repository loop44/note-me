import { useState } from 'react';
import { v4 } from 'uuid';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import DarkModeSvg from '../../assets/icons/dark-mode.svg';
import LogOutSvg from '../../assets/icons/log-out.svg';
import PlusSvg from '../../assets/icons/plus.svg';
import SearchSvg from '../../assets/icons/search.svg';
import LogoSvg from '../../assets/images/logo-icon.svg';

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

interface NoteProps {
  logOut: () => void;
}

const Notes: React.FC<NoteProps> = ({ logOut }) => {
  const [items, setItems] = useState([
    {
      id: '1',
      text: 'one'
    },
    {
      id: '2',
      text: 'two'
    },
    {
      id: '3',
      text: 'three'
    },
    {
      id: '4',
      text: 'four'
    },
    {
      id: '5',
      text: 'five'
    },
    {
      id: '6',
      text: 'six'
    },
    {
      id: '7',
      text: 'seven'
    },
    {
      id: '8',
      text: 'eight'
    },
    {
      id: '9',
      text: 'nine'
    }
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const addItem = () => {
    setItems([{ id: v4(), text: '' }, ...items]);
  };

  const changeNote = (value: string, id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.text = value;
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
        setSelectedText(item.text);
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
        return arrayMove(notes, oldIndex, newIndex);
      });
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
            Hello, <span>Loop</span>
            <span>!</span> 👋🏼
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
                <SortableNote key={item.id} id={item.id} changeNote={changeNote} text={item.text}>
                  {item.text ? (
                    <div>{item.text}</div>
                  ) : (
                    <div className="placeholder">Type your note here</div>
                  )}
                  <p>Feb, 10 2022</p>
                </SortableNote>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <Note id={activeId} className="dragOverlay">
                  {selectedText ? (
                    <div>{selectedText}</div>
                  ) : (
                    <div className="placeholder">Type your note here</div>
                  )}
                  <p>Feb, 10 2022</p>
                </Note>
              ) : null}
            </DragOverlay>
          </DndContext>
        </NotesGrid>
      </NotesContent>
    </NotesWrapper>
  );
};

export default Notes;
