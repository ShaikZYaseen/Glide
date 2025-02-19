import React from "react";
import styled from "styled-components";

type ButtonProps = {
  onClick: () => void; // Define the type for the onClick prop
};

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>Button</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    background-color: #ffffff;
    border: 1px solid rgb(209, 213, 219);
    border-radius: 0.5rem;
    color: #111827;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: 0.75rem 1rem;
    text-align: center;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  button:hover {
    background-color: #f9fafb;
  }

  button:focus {
    outline: 2px solid rgba(0, 0, 0, 0.1);
    outline-offset: 2px;
  }

  button:focus-visible {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

export default Button;
