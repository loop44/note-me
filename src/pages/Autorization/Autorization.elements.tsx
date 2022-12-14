import styled from 'styled-components';

export const AutorizationWrapper = styled.div`
  height: 100vh;
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  position: relative;
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

  @media (max-width: 45.625em) {
    display: none;
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
  }

  & .formContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & img {
    align-self: flex-start;
    margin-bottom: 75px;
  }
  @media (max-width: 45.625em) {
    width: 100%;
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
    font-size: 0.875rem;
    color: #a8a8b3;
    margin: 2.188rem 0;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.875rem;

    .main {
      flex-shrink: 1;
    }

    .left,
    .right {
      flex-shrink: 0;
      height: 1px;
      background-color: #a8a8b3;
      width: 4.75rem;
      position: relative;
      top: 0.5rem;
    }
  }
`;

export const Error = styled.div`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7685c;
    padding: 0.625rem 0.875rem;
    position: relative;
    color: #fff;
    gap: 0.875rem;

    > img {
      cursor: pointer;
    }
  }

  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;
