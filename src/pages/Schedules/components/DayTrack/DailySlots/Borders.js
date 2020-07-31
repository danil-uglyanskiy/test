import React from "react";
import styled from "styled-components";
import { ArrowRight, ArrowLeft } from "icons";

const BorderResize = styled.div`
  position: absolute;
  height: 100%;
  border-right: 4px solid #2d91ff;
  width: 10px;
  cursor: col-resize;
  right: -1px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  top: 0;
  display: flex;
  align-items: center;
`;

const Icon = styled(ArrowRight)`
  flex-shrink: 0;
  width: 19px;
  height: 15px;
  color: #fff;
  transform: translateX(15px);

  ${BorderResize}:not(:hover) > & {
      display: none;
  }
`;

export const EndBorder = props => (
  <BorderResize {...props}>
    <Icon />
  </BorderResize>
);

const BorderResizeStart = styled(BorderResize)`
  right: auto;
  left: -1px;
  border-top-left-radius: 4px;
  border-right: 0px;
  border-left: 4px solid #2d91ff;
  border-bottom-left-radius: 4px;
  justify-content: flex-end;
`;

const Icon2 = styled(ArrowLeft)`
  flex-shrink: 0;
  width: 19px;
  height: 15px;
  color: #fff;
  transform: rotate(180deg)translateX(15px);

  ${BorderResizeStart}:not(:hover) > & {
      display: none;
  }
`;

export const StartBorder = props => (
  <BorderResizeStart {...props}>
    <Icon2 />
  </BorderResizeStart>
);
