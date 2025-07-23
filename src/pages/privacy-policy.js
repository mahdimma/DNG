import React from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const PrivacyPolicyPage = () => {
  return (
    <Layout title="Privacy Policy" description="Privacy policy for Dangepia Village website">
      <HeroSection 
        title="سیاست حفظ حریم خصوصی"
        subtitle="اطلاعاتی در مورد نحوه استفاده از اطلاعات شما"
        showButtons={false}
        showScrollIndicator={true}
      />
      <div style={{ maxWidth: 800, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Privacy Policy</h1>
        <p style={{ fontSize: `0.9rem`, color: `#666`, marginBottom: `2rem` }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Introduction</h2>
          <p>
            Dangepia Village ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how your personal information is collected, used, 
            and disclosed by Dangepia Village website.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Information We Collect</h2>
          <h3>Information You Provide to Us</h3>
          <p>We collect information you provide directly to us, such as when you:</p>
          <ul>
            <li>Fill out our contact forms</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in village surveys</li>
            <li>Submit feedback or requests</li>
            <li>Register for village events</li>
          </ul>

          <h3>Information We Collect Automatically</h3>
          <p>When you access our website, we automatically collect certain information, including:</p>
          <ul>
            <li>Your IP address</li>
            <li>Browser type and version</li>
            <li>Pages you visit on our site</li>
            <li>Time and date of your visit</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Communicate with you about village matters</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Respond to your inquiries and requests</li>
            <li>Organize and manage village events</li>
            <li>Analyze website usage to improve user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>To comply with legal requirements</li>
            <li>To protect our rights and safety</li>
            <li>To service providers who assist us (under strict confidentiality agreements)</li>
            <li>In case of a merger or acquisition (you will be notified)</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, 
            no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your 
            browsing experience. You can set your browser to refuse cookies, but this may 
            limit some functionality of our website.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent at any time</li>
            <li>Receive a copy of your information</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Children's Privacy</h2>
          <p>
            Our website is not directed to children under 13 years of age. We do not 
            knowingly collect personal information from children under 13. If you believe 
            we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the "Last updated" 
            date at the top of this page.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul style={{ listStyle: `none`, padding: 0 }}>
            <li><strong>Email:</strong> privacy@dangepia.ir</li>
            <li><strong>Phone:</strong> +98-XXX-XXXX</li>
            <li><strong>Address:</strong> Village Office, Main Street, Dangepia Village</li>
          </ul>
        </section>

        <div style={{
          background: `#f7fafc`,
          padding: `1.5rem`,
          borderRadius: `8px`,
          border: `1px solid #e2e8f0`,
          marginTop: `2rem`,
        }}>
          <p style={{ margin: 0, fontSize: `0.9rem`, color: `#4a5568` }}>
            This privacy policy is compliant with Iranian data protection laws and international 
            privacy standards. For specific legal questions, please consult with a legal professional.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPolicyPage
