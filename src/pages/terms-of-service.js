import React from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const TermsOfServicePage = () => {
  return (
    <Layout title="Terms of Service" description="Terms of service for Dangepia Village website">
      <HeroSection 
        title="شرایط استفاده از خدمات"
        subtitle="قوانین و مقررات استفاده از وبسایت"
        showButtons={false}
        showScrollIndicator={true}
      />
      <div style={{ maxWidth: 800, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Terms of Service</h1>
        <p style={{ fontSize: `0.9rem`, color: `#666`, marginBottom: `2rem` }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using the Dangepia Village website ("Service"), you accept and agree 
            to be bound by the terms and provision of this agreement. If you do not agree to 
            abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Description of Service</h2>
          <p>
            Dangepia Village provides an online platform for village residents and visitors to:
          </p>
          <ul>
            <li>Access information about village services</li>
            <li>Stay updated with news and events</li>
            <li>Contact village officials</li>
            <li>View village maps and locations</li>
            <li>Check weather information</li>
            <li>Browse village gallery</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>User Responsibilities</h2>
          <p>As a user of our service, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information when required</li>
            <li>Use the service only for lawful purposes</li>
            <li>Respect the privacy and rights of other users</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not distribute malware or harmful code</li>
            <li>Not use the service for commercial purposes without permission</li>
            <li>Report any security vulnerabilities you discover</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Content and Intellectual Property</h2>
          <h3>Our Content</h3>
          <p>
            All content on this website, including text, graphics, logos, images, and software, 
            is the property of Dangepia Village or its content suppliers and is protected by 
            copyright and other intellectual property laws.
          </p>
          
          <h3>User-Generated Content</h3>
          <p>
            When you submit content to our website (such as comments, photos, or feedback), 
            you grant us a non-exclusive, royalty-free, perpetual license to use, modify, 
            and display such content for the purpose of operating our service.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Prohibited Uses</h2>
          <p>You may not use our service:</p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>For any obscene or immoral purpose</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Service Availability</h2>
          <p>
            We strive to maintain continuous service availability, but we do not guarantee 
            that our service will be uninterrupted or error-free. We reserve the right to:
          </p>
          <ul>
            <li>Modify or discontinue the service with or without notice</li>
            <li>Perform maintenance that may temporarily affect service availability</li>
            <li>Update or change features and functionality</li>
            <li>Restrict access to certain features or content</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also 
            governs your use of the service, to understand our practices.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Disclaimers</h2>
          <p>
            The information on this website is provided on an "as is" basis. To the fullest 
            extent permitted by law, this Company:
          </p>
          <ul>
            <li>Excludes all representations and warranties relating to this website and its contents</li>
            <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
            <li>Does not guarantee the accuracy or completeness of weather information</li>
            <li>Is not responsible for external links or third-party content</li>
          </ul>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Dangepia Village, its directors, employees, or agents be liable 
            for any indirect, incidental, special, consequential, or punitive damages, including 
            without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
            resulting from your use of the service.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Dangepia Village and its licensee 
            and licensors, and their employees, contractors, agents, officers and directors, 
            from and against any and all claims, damages, obligations, losses, liabilities, 
            costs or debt, and expenses (including but not limited to attorney's fees).
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access immediately, without prior notice or liability, 
            for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed by the laws of the Islamic Republic 
            of Iran, without regard to its conflict of law provisions. Our failure to enforce 
            any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms 
            at any time. If a revision is material, we will try to provide at least 30 days 
            notice prior to any new terms taking effect.
          </p>
        </section>

        <section style={{ marginBottom: `2rem` }}>
          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <ul style={{ listStyle: `none`, padding: 0 }}>
            <li><strong>Email:</strong> legal@dangepia.ir</li>
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
            These terms of service are governed by Iranian law and are designed to protect 
            both the village and our users. For specific legal questions, please consult 
            with a qualified legal professional.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default TermsOfServicePage
