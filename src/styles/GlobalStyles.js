import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-color: #f6f8fc;
    color: #333;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 0;
  }

  ::-webkit-scrollbar-track {
    background-color: #f6f8fc;
  }

  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #f6f8fc;
`;

export default GlobalStyles;
