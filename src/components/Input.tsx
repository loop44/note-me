import styled from 'styled-components';

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  margin-bottom: 0.75rem;
  width: 100%;

  p {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #a8a8b3;
  }

  input {
    padding: 0.813rem 0.75rem 0.813rem 1rem;
    background: #ffffff;
    border: 1px solid #a8a8b3;
    border-radius: 0.5rem;
    outline: none;
    transition: box-shadow 0.15s ease-in-out;

    &:focus {
      box-shadow: 0 0 0 0.2rem rgb(158 158 158 / 25%);
    }

    &::placeholder {
      font-weight: 400;
      line-height: 1.125rem;
      color: #a8a8b3;
    }
  }

  &.error {
    p {
      color: #f7685c;
    }
    input {
      color: #f7685c;
      border: 1px solid #f7685c;

      &:focus {
        box-shadow: 0 0 0 0.2rem rgb(247 104 92 / 25%);
      }
    }
  }
`;
