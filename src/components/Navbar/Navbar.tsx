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
          <HomeLink
            to="/"
            onClick={() => {
              setActive('');
            }}
          >
            {/* Logo here instead? */}
            <Name>STT Booking</Name>
          </HomeLink>
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

const Name = styled.p`
  display: flex;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  cursor: pointer;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
