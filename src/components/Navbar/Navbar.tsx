import { Link } from 'react-router-dom';
import { useState } from 'react';
import { navLinks } from '../../constants';
import { menu, close } from '../../assets';
import styled from '@emotion/styled';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <Nav>
      <Container>
        <LogoContainer>
          <Link
            to="/"
            onClick={() => {
              setActive('');
            }}
          >
            {/* Logo here instead? */}
            <Name>
              <span className="actual-text">&nbsp;habitstreak&nbsp;</span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;habitstreak&nbsp;
              </span>
            </Name>
          </Link>
        </LogoContainer>
        <DesktopContainer>
          <NavList>
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                onClick={() => {
                  setActive(link.title);
                }}
                isActive={active === link.title}
                to={`/${link.id}`}
              >
                {link.title}
              </NavLink>
            ))}
          </NavList>
        </DesktopContainer>
        <MobileContainer>
          <MenuIcon src={toggle ? close : menu} alt="menu" onClick={() => setToggle(!toggle)} />
          <Dropdown toggle={toggle}>
            <DropdownList>
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  onClick={() => {
                    setActive(link.title);
                  }}
                  isActive={active === link.title}
                  to={`/${link.id}`}
                >
                  {link.title}
                </NavLink>
              ))}
            </DropdownList>
          </Dropdown>
        </MobileContainer>
      </Container>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  top: 0px;
  z-index: 20;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

const LogoContainer = styled.div`
  margin-left: 2.5rem;
`;

const Name = styled.button`
  position: relative;
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  --border-width: 6px;
  --text-stroke-color: rgba(255, 255, 255, 0.6);
  --animation-color: #37ff8b;
  --fs-size: 2em;
  font-size: var(--fs-size);
  font-family: 'Arial';
  letter-spacing: 3px;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-stroke-color);

  .hover-text {
    position: absolute;
    inset: 0;
  }

  .actual-text {
    color: var(--text-stroke-color);
    -webkit-text-stroke: 1px transparent;
  }

  .hover-text {
    width: 0;
    overflow: hidden;
    color: var(--animation-color);
    -webkit-text-stroke: 1px var(--animation-color);
    border-right: var(--border-width) solid var(--animation-color);
    transition: width 0.5s ease;
  }

  &:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color));
  }
`;

const DesktopContainer = styled.div`
  display: none;
  justify-content: end;
  align-items: center;
  margin-right: 10px;

  @media (min-width: 640px) {
    display: flex;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 10px;

  @media (min-width: 640px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: start;
  gap: 10px;
  width: 100%;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  font-bold;
  cursor: pointer;
  text-align: right;
  width: 100%;
  white-space: nowrap;
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

const MenuIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const Dropdown = styled.div<{ toggle: boolean }>`
  display: ${({ toggle }) => (toggle ? 'flex' : 'none')};
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%);
  position: absolute;
  padding: 6px;
  top: 14px;
  right: 4px;
  margin: 4px;
  z-index: 10;
  border-radius: 12px;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  gap: 4px;
`;
