import { AnimatePresence, motion } from 'framer-motion';

import { useDroppable } from '@dnd-kit/core';

import DeleteSvg from '../../assets/icons/delete.svg';

import { DeleteBlock } from './Notes.elements';

interface TrashProps {
  id: string;
  activeId: string | null;
}

const Trash: React.FC<TrashProps> = ({ id, activeId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  return (
    <AnimatePresence>
      {activeId ? (
        <DeleteBlock
          as={motion.div}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          ref={setNodeRef}
          className={isOver ? 'active' : ''}
        >
          <img src={DeleteSvg} alt="" />
        </DeleteBlock>
      ) : null}
    </AnimatePresence>
  );
};

export default Trash;
