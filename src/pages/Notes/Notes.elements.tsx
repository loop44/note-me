import styled from 'styled-components';

export const NotesWrapper = styled.div`
  height: 100%;

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

    &.visible {
      background-color: rgba(0, 0, 0, 0.6);
      pointer-events: all;
      z-index: 1;
    }
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #fffdfa;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 32px;
`;

export const NotesContent = styled.div`
  padding: 2.5rem 7rem 2.5rem 14rem;
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
`;

export const Greeting = styled.div`
  margin-bottom: 3.938rem;

  h1 {
    font-size: 2rem;
    line-height: 2.313rem;
    margin-bottom: 0.438rem;

    span {
      font-weight: 700;
    }
  }

  p {
    font-size: 1.25rem;
    line-height: 1.438rem;
    color: #4d4d4d;
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

export const NotePopup = styled.div`
  .content {
    width: 564px;
    margin: 0 auto;
    padding: 40px;
    height: 540px;
    background: rgba(151, 210, 188);
    border-radius: 10px;
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
  }
`;
