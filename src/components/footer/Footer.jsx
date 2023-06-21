import styled from "styled-components"

export const Footer = () => {
    return (
        <FooterBlock>
            <FooterText>PhotoHosting</FooterText>
            <FooterSubText>© 2023 Photohosting.com</FooterSubText>
        </FooterBlock>
    )
}

export const FooterBlock = styled.div`
position: fixed;
height: 130px;
left: 0;
bottom: 0;
width: 100%;
background: #FFFFFF;
color: white;
text-align: center;
@media (max-width: 768px) {
    height: 77px;
}
`
export const FooterText = styled.p`
margin-bottom: 16px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 35px;
color: #4F6688;
@media (max-width: 768px) {
    font-size: 18px;
    line-height: 18px;
}
`
export const FooterSubText = styled.p`
margin-top: 0px;
margin-bottom: 31px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 18px;
align-items: center;
text-align: center;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #333333;
`