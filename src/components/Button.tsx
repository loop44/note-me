import styled from 'styled-components';

interface ButtonProps {
  readonly green?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border: none;
  outline: none;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.125rem;
  padding: 1rem;
  color: #fefefe;
  border-radius: 0.5rem;
  width: 100%;
  transition: box-shadow 0.15s ease-in-out;
  cursor: pointer;

  background: ${(props) => (props.green ? '#30c58d' : '#f7685c')};

  && img {
    margin: 0;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgb(158 158 158 / 25%);
  }
`;
