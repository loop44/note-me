import styled from 'styled-components';

export const AutorizationWrapper = styled.div`
  height: 100vh;
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
`;

export const LeftCol = styled.div`
  width: 47%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30.375rem;
    padding: 0 15px;
  }
  & img {
    max-width: 100%;
    align-self: center;
    margin-bottom: 5rem;
    object-fit: cover;
  }
  & h1 {
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 2.625rem;
    margin-bottom: 1.313em;
  }
  & p {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 2rem;
    color: #808080;
  }
`;

export const RightCol = styled.div`
  width: 53%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffdfa;

  & form {
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & img {
    align-self: flex-start;
    margin-bottom: 75px;
  }

  .changeAuthMethod {
    display: inline-block;
    align-self: flex-end;
    width: auto;
    padding: 0;
    border: none;
    outline: none;
    border-radius: 0;

    padding-bottom: 2px;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #a8a8b3;

    margin-bottom: 0.75rem;
    border-bottom: 1px solid #a8a8b3;
    background: none;

    cursor: pointer;

    &:focus {
      box-shadow: 0 0 0 0.2rem rgb(158 158 158 / 25%);
    }
  }

  .decoration {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #a8a8b3;
    margin: 2.188rem 0;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 14px;

    .main {
      flex-shrink: 1;
    }

    .left,
    .right {
      flex-shrink: 0;
      height: 1px;
      background-color: #a8a8b3;
      width: 76px;
      position: relative;
      top: 8px;
    }
  }
`;
