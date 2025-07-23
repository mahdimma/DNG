import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const HeaderContainer = styled.header`
  background: #2c5282;
  margin-bottom: 1.45rem;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const SiteTitle = styled.h1`
  margin: 0;
  
  a {
    color: white;
    text-decoration: none;
  }
`

const Navigation = styled.nav`
  margin-top: 1rem;
`

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
  flex-wrap: wrap;
`

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <HeaderContent>
      <SiteTitle>
        <Link to="/">
          {siteTitle}
        </Link>
      </SiteTitle>
      <Navigation>
        <NavList>
          <NavItem>
            <Link to="/">
              خانه
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about">
              درباره ما
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/news">
              اخبار
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/services">
              خدمات
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/contact">
              تماس با ما
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/gallery">
              گالری تصاویر
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/maps">
              نقشه
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/weather">
              آب و هوا
            </Link>
          </NavItem>
        </NavList>
      </Navigation>
    </HeaderContent>
  </HeaderContainer>
)

export default Header
