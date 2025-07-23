import React, { useState } from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormSection = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
`

const ContactInfo = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
`

const InfoCard = styled.div`
  background: #f7fafc;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  
  h3 {
    margin-bottom: 1rem;
  }
  
  div {
    margin-bottom: 1rem;
  }
`

const EmergencyCard = styled.div`
  background: #fed7d7;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #feb2b2;
  
  h3 {
    color: #c53030;
    margin-bottom: 1rem;
  }
  
  div {
    margin-bottom: 0.5rem;
  }
`

const Form = styled.form`
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  direction: rtl;
  text-align: right;
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  direction: rtl;
  text-align: right;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  direction: rtl;
  text-align: right;
`

const SubmitButton = styled.button`
  background: #667eea;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #5a67d8;
  }
`

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #22543d;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 2rem;
  border: 1px solid #9ae6b4;
`

const MapSection = styled.section`
  margin-top: 3rem;
  background: #f7fafc;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`

const MapPlaceholder = styled.div`
  background: #e2e8f0;
  height: 300px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
`

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <Layout title="تماس با ما" description="با مسئولان و رهبران جامعه روستای دانگپیا در تماس باشید">
      <HeroSection 
        title="تماس با ما"
        subtitle="راه های ارتباطی با ما"
        showButtons={false}
        showScrollIndicator={true}
      />
      <Container>
        <h1>تماس با ما</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          دوست داریم از شما بشنویم! برای هر گونه سوال، نگرانی یا پیشنهاد در مورد روستای ما با ما تماس بگیرید.
        </p>

        <GridContainer>
          <FormSection>
            <h2>پیام خود را ارسال کنید</h2>
            {isSubmitted && (
              <SuccessMessage>
                از پیام شما متشکریم! به زودی با شما تماس خواهیم گرفت.
              </SuccessMessage>
            )}
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">
                  نام و نام خانوادگی *
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="نام کامل خود را وارد کنید"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">
                  آدرس ایمیل *
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">
                  موضوع *
                </Label>
                <Select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">موضوع را انتخاب کنید...</option>
                  <option value="general">استعلام عمومی</option>
                  <option value="services">خدمات روستا</option>
                  <option value="complaint">شکایت</option>
                  <option value="suggestion">پیشنهاد</option>
                  <option value="event">استعلام رویداد</option>
                  <option value="other">سایر</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">
                  پیام *
                </Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="لطفا درخواست خود را به تفصیل شرح دهید..."
                />
              </FormGroup>

              <SubmitButton type="submit">
                ارسال پیام
              </SubmitButton>
            </Form>
          </FormSection>

          <ContactInfo>
            <h2>اطلاعات تماس</h2>
            
            <InfoCard>
              <h3>دفتر روستا</h3>
              <div>
                <strong>آدرس:</strong><br />
                دفتر روستای دانگپیا<br />
                خیابان اصلی، دانگپیا<br />
                [کدپستی]، [استان]، ایران
              </div>
              <div>
                <strong>تلفن:</strong> ۰۹۸-XXX-XXXX
              </div>
              <div>
                <strong>ایمیل:</strong> info@dangepia.ir
              </div>
              <div>
                <strong>ساعات کاری:</strong><br />
                دوشنبه تا جمعه: ۸:۰۰ تا ۱۶:۰۰<br />
                شنبه: ۹:۰۰ تا ۱۳:۰۰<br />
                یکشنبه: تعطیل
              </div>
            </InfoCard>

            <InfoCard>
              <h3>شورای روستا</h3>
              <div>
                <strong>دهیار:</strong> [نام دهیار]<br />
                <strong>ایمیل:</strong> mayor@dangepia.ir
              </div>
              <div>
                <strong>جلسات شورا:</strong><br />
                پنجشنبه اول هر ماه<br />
                ساعت ۱۹:۰۰ در سالن روستا
              </div>
            </InfoCard>

            <EmergencyCard>
              <h3>تماس‌های اضطراری</h3>
              <div>
                <strong>پلیس:</strong> ۱۱۰
              </div>
              <div>
                <strong>آتش‌نشانی:</strong> ۱۲۵
              </div>
              <div>
                <strong>اورژانس پزشکی:</strong> ۱۱۵
              </div>
              <div>
                <strong>خط اضطراری روستا:</strong> ۰۹۸-XXX-XXXX
              </div>
            </EmergencyCard>
          </ContactInfo>
        </GridContainer>

        <MapSection>
          <h3>ما را پیدا کنید</h3>
          <p style={{ marginBottom: `1rem` }}>
            در ساعات اداری از دفتر روستا دیدن کنید یا در جلسات ماهانه شورا شرکت کنید.
          </p>
          <MapPlaceholder>
            <div>
              <p>نقشه تعاملی</p>
              <p style={{ fontSize: `0.9rem` }}>
                (ادغام نقشه در اینجا اضافه خواهد شد)
              </p>
            </div>
          </MapPlaceholder>
        </MapSection>
      </Container>
    </Layout>
  )
}

export default ContactPage
