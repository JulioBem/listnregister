import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdOutlinePeople,
  MdOutlineShoppingCart,
  MdOutlineListAlt,
} from "react-icons/md";

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 68px;
  background-color: #fff;
  width: 100vw;
`;

const NavLinkContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 6px;
  font-weight: 400;
  cursor: pointer;

  a {
    color: #5d6570;
    font-size: 16px;
    line-height: 18.75px;
    text-decoration: none;
    position: relative;
  }

  &.activeLink {
    background-color: #f7f9fc;
    border-radius: 6px;
    color: #006ffd;

    a {
      color: #006ffd;
      text-decoration: none;
    }
  }

  &:hover {
    background-color: #f7f9fc;
    border-radius: 6px;
    color: #006ffd;
    transition: all 0.2s ease-in-out;

    a {
      color: #006ffd;
    }
  }
`;

const pages = ["Clientes", "Pedidos", "Produtos"];

const NavBar = () => {
  const location = useLocation();

  const renderIcon = (page) => {
    switch (page) {
      case "Clientes":
        return <MdOutlinePeople />;
      case "Pedidos":
        return <MdOutlineShoppingCart />;
      case "Produtos":
        return <MdOutlineListAlt />;
      default:
        return null;
    }
  };

  return (
    <NavBarContainer>
      {pages.map((page) => {
        const isActive = location.pathname === `/${page.toLowerCase()}`;

        return (
          <NavLinkContainer className={isActive ? "activeLink" : ""} key={page}>
            {renderIcon(page)}
            <NavLink to={`/${page.toLowerCase()}`} end={page === "Clients"}>
              {page}
            </NavLink>
          </NavLinkContainer>
        );
      })}
    </NavBarContainer>
  );
};

export default NavBar;
