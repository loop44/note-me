import React, { useState } from 'react';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';

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
import SortableItem from './SortableItem';

const Notes = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      text: 'one'
    },
    {
      id: 2,
      text: 'two'
    },
    {
      id: 3,
      text: 'three'
    },
    {
      id: 4,
      text: 'four'
    },
    {
      id: 5,
      text: 'five'
    },
    {
      id: 6,
      text: 'six'
    },
    {
      id: 7,
      text: 'seven'
    },
    {
      id: 8,
      text: 'eight'
    },
    {
      id: 9,
      text: 'nine'
    }
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
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
        const oldIndex = indexes.indexOf(Number(active.id));
        const newIndex = indexes.indexOf(Number(over.id));
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
                <SortableItem key={item.id} id={item.id} text={item.text}>
                  <div>{item.text}</div>
                  <p>Feb, 10 2022</p>
                </SortableItem>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <Note id={activeId} className="dragOverlay">
                  <div>{selectedText}</div>
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
