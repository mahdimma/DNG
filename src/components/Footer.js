import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const FooterContainer = styled.footer`
  background: #1a202c;
  color: white;
  padding: 2rem 1rem;
  margin-top: 2rem;
`

const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const FooterSection = styled.div`
  h3, h4 {
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #cbd5e0;
        text-decoration: none;
        
        &:hover {
          color: white;
        }
      }
    }
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #4a5568;
`

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterSection>
        <h3>روستای دانگپیا</h3>
        <p>
          به روستای زیبای ما خوش آمدید. با آخرین اخبار، رویدادها و خدمات در ارتباط باشید.
        </p>
      </FooterSection>
      <FooterSection>
        <h4>پیوندهای سریع</h4>
        <ul>
          <li>
            <Link to="/about">
              درباره ما
            </Link>
          </li>
          <li>
            <Link to="/news">
              اخبار
            </Link>
          </li>
          <li>
            <Link to="/services">
              خدمات
            </Link>
          </li>
          <li>
            <Link to="/contact">
              تماس با ما
            </Link>
          </li>
        </ul>
      </FooterSection>
      <FooterSection>
        <h4>قوانین</h4>
        <ul>
          <li>
            <Link to="/privacy-policy">
              حریم خصوصی
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service">
              شرایط خدمات
            </Link>
          </li>
        </ul>
      </FooterSection>
    </FooterContent>
    <Copyright>
      <p>
        © {new Date().getFullYear()} روستای دانگپیا. تمامی حقوق محفوظ است.
      </p>
    </Copyright>
  </FooterContainer>
)

export default Footer
