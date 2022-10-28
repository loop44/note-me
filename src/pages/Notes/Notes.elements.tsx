import styled from 'styled-components';

export const NotesWrapper = styled.div`
  height: 100%;
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) => (props.theme.main === 'dark' ? '#343539' : '#fff')};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: none;
  }

  .notePopupOverlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: background-color 0.3s ease-in-out;
    z-index: 100;

    &.visible {
      background-color: rgba(0, 0, 0, 0.6);
      pointer-events: all;
    }
  }

  .plusMobile {
    display: none;
    position: fixed;
    bottom: 25px;
    left: 25px;

    @media (max-width: 36.25em) {
      display: block;
    }
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.875rem 2rem;

  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) => (props.theme.main === 'dark' ? '#3C3D43' : '#fffdfa')};

  @media (max-width: 36.25em) {
    display: none;
  }
`;

export const NotesContent = styled.div`
  padding: 2.5rem 12rem 2.5rem 14rem;

  @media (max-width: 61.563em) {
    padding: 2.5rem 6rem 2.5rem 9rem;
  }

  @media (max-width: 36.25em) {
    padding: 2rem;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.313rem;

  .input {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    input {
      border: none;
      outline: none;
      font-size: 1.125rem;
      line-height: 1.313rem;
      background: transparent;

      transition: color 0.3s ease-in-out;
      color: ${(props) => (props.theme.main === 'dark' ? '#fff' : '#000')};

      @media (max-width: 36.25em) {
        max-width: 9.375rem;
      }

      &::placeholder {
        color: #808080;
      }
    }

    img {
      width: 1.125rem;
    }
  }

  img {
    width: 1.5rem;
  }

  .logOutMobile {
    display: none;

    @media (max-width: 36.25em) {
      display: block;
    }
  }
`;

export const Greeting = styled.div`
  margin-bottom: 3.938rem;

  h1 {
    font-size: 2rem;
    line-height: 2.313rem;
    margin-bottom: 0.438rem;
    transition: color 0.3s ease-in-out;
    color: ${(props) => (props.theme.main === 'dark' ? '#fff' : '#000')};

    span.bold {
      font-weight: 700;
    }
  }

  p {
    font-size: 1.25rem;
    line-height: 1.438rem;
    transition: color 0.3s ease-in-out;
    color: ${(props) => (props.theme.main === 'dark' ? '#A8A8B3' : '#4d4d4d')};
  }
`;

export const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 264px);
  grid-gap: 36px;
`;

export const Note = styled.div`
  padding: 25px 25px 21px 25px;
  height: 240px;
  background: rgba(151, 210, 188);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 264px;
  position: relative;

  &.dragOverlay {
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    cursor: grabbing;
  }

  div {
    flex-grow: 1;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #3c3d43;

    /* End line dots ... */
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.placeholder {
      color: #757575;
      user-select: none;
    }
  }

  p {
    flex-grow: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #3c3d43;
    opacity: 0.8;
  }
`;

export const NotePopupElement = styled.div`
  border-radius: 10px;
  position: relative;
  .content {
    width: 564px;
    margin: 0 auto;
    padding: 40px;
    height: 540px;

    @media (max-width: 36.25em) {
      width: 100%;
    }
  }

  textarea {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    resize: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #3c3d43;

    &::-webkit-scrollbar {
      width: 0.3rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: none;
    }

    &::placeholder {
      color: #757575;
    }
  }

  span {
    position: absolute;
    right: 20px;
    bottom: 15px;
    color: #3c3d43;
  }
`;

export const DeleteBlock = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 180px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background: rgb(9, 9, 121);
    background: linear-gradient(
      90deg,
      rgba(9, 9, 121, 0) 0%,
      rgba(255, 0, 0, 0.06206232492997199) 100%
    );
  }

  @media (max-width: 36.25em) {
    width: 80px;
  }
`;
