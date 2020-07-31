import styled from "styled-components";

const Range = styled.div`
  position: absolute;
  height: 100%;
  background: #cee7ff;
  border: 2px solid #2d91ff;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 14px;
  user-select: none;

  transform: translateX(${props => props.offset || 0}px);
  width: ${props => props.width || 0}px;

  :before {
    content: attr(title);
    color: #1a7ce8;
    font-family: "Helvetica Neue";
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  :hover {
    z-index: 1;
  }
`;

export default Range;
