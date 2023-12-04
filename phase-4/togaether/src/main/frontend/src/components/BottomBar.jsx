import React from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBook } from "react-icons/fa";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <NavBar>
      <NavItem onClick={() => navigate("/home")} active={isActive("/home")}>
        <FaSearch />
        <span>검색</span>
      </NavItem>
      <NavItem onClick={() => navigate("/diary")} active={isActive("/diary")}>
        <FaBook />
        <span>일기</span>
      </NavItem>
    </NavBar>
  );
};

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 100%;

  svg {
    font-size: 1.5em;
  }

  span {
    font-size: 0.75em;
    margin-top: 5px;
  }

  ${({ active }) =>
    active
      ? css`
          color: #000;
          svg {
            fill: #000;
          }
        `
      : css`
          color: #ccc;
          svg {
            fill: #ccc;
          }
        `}
`;

export default BottomBar;
