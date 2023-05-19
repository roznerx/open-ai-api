"use client"

import { useSignInModal } from "app/components/modals/SignInModal"
import HeaderWrapper from "app/components/shared/HeaderWrapper"
import Link from "next/link"

export default function Client({ session }) {
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal(
    {},
  )

  return (
    <>
      <div className="flex min-h-screen flex-nowrap font-sans">
        <div className="mx-auto max-w-max pb-10">
          <SignInModal />
          <HeaderWrapper
            setShowSignInModal={setShowSignInModal}
            showSignInModal={showSignInModal}
            session={session}
            userHasAccount={undefined}
          />
          <div className="mx-auto mt-28 w-[80%]">
            <h1 className="my-3 ml-4  text-3xl font-medium text-white">
              Terms of Use
            </h1>
            <p className="p-4 text-white">
              Thank you for using Code Genius. The AI companion for developers.
            </p>
            <h2 className="m-4 text-2xl font-medium text-white">
              1. Agreement
            </h2>
            <p className="p-4 text-white">
              Terms By accessing this Website, accessible from code-genius.dev,
              you are agreeing to be bound by these Website Terms and Conditions
              of Use and agree that you are responsible for the agreement with
              any applicable local laws. If you disagree with any of these
              terms, you are prohibited from accessing this site. The materials
              contained in this Website are protected by copyright and trade
              mark law.
            </p>
            <h2 className="m-4 text-2xl font-medium text-white">
              2. Registration and Access to Services
            </h2>
            <p className="p-4 text-white">
              If you use the Services on behalf of another person or entity, you
              must have the authority to accept the Terms on their behalf. You
              must provide accurate and complete information to register for an
              account. You may not make your access credentials or account
              available to others outside your organization, and you are
              responsible for all activities that occur using your credentials.
            </p>
            <h2 className="m-4 text-2xl font-medium text-white">
              3. Usage Requirements
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">
                (a) Use of Services. You may access, and we grant you a
                non-exclusive right to use, the Services in accordance with
                these Terms. You will comply with these Terms and all applicable
                laws when using the Services. We and our affiliates own all
                rights, title, and interest in and to the Services.
              </p>
              <p className="p-4">
                (b) Feedback. We appreciate feedback, comments, ideas, proposals
                and suggestions for improvements. If you provide any of these
                things, we may use it without restriction or compensation to
                you.
              </p>
              <p className="p-4">
                (c) Restrictions. You may not (i) use the Services in a way that
                infringes, misappropriates or violates any person’s rights; (ii)
                reverse assemble, reverse compile, decompile, translate or
                otherwise attempt to discover the source code or underlying
                components of models, algorithms, and systems of the Services
                (except to the extent such restrictions are contrary to
                applicable law); (iii) use output from the Services to develop
                models that compete with Code Genius; (iv) except as permitted
                through the API, use any automated or programmatic method to
                extract data or output from the Services, including scraping,
                web harvesting, or web data extraction; (v) represent that
                output from the Services was human-generated when it is not or
                otherwise violate our Usage Policies; (vii), send us any
                personal information of children under 13 or the applicable age
                of digital consent. You will comply with any rate limits and
                other requirements in our documentation. You may use Services
                only in geographies currently supported by Code Genius.
              </p>
              <p className="p-4">
                (d) Third Party Services. Any third party software, services, or
                other products you use in connection with the Services are
                subject to their own terms, and we are not responsible for third
                party products.
              </p>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">4. Content</h2>
            <div className="p-4 text-white">
              <p className="p-4">
                (a) Your Content. You may provide input to the Services
                (“Input”), and receive output generated and returned by the
                Services based on the Input (“Output”). Input and Output are
                collectively “Content.” As between the parties and to the extent
                permitted by applicable law, you own all Input. Subject to your
                compliance with these Terms, Code Genius hereby assigns to you
                all its right, title and interest in and to Output. This means
                you can use Content for any purpose, including commercial
                purposes such as sale or publication, if you comply with these
                Terms. Code Genius may use Content to provide and maintain the
                Services, comply with applicable law, and enforce our policies.
                You are responsible for Content, including for ensuring that it
                does not violate any applicable law or these Terms.
              </p>
              <p className="p-4">
                (b) Similarity of Content. Due to the nature of machine
                learning, Output may not be unique across users and the Services
                may generate the same or similar output for Code Genius or a
                third party. For example, you may provide input to a model such
                as “How to make a time component in React?” and receive
                different output or receive the same response. Responses that
                are requested by and generated for other users are not
                considered your Content.
              </p>
              <p className="p-4">
                (c) Use of Content to Improve Services. We may use Content from
                Services, to help develop and improve our Services. If you do
                not want your Content to be used to improve our Services, you
                can opt out by{" "}
                <Link href="mailto:info@code-genius.dev">contacting us</Link>.
                Please note that in some cases this may limit the ability of our
                Services to better address your specific use case.
              </p>
              <p className="p-4">
                (d) Accuracy. Artificial intelligence and machine learning are
                rapidly evolving fields of study. We are constantly working to
                improve our Services to make them more accurate, reliable, safe
                and beneficial. Given the probabilistic nature of machine
                learning, use of our Services may in some situations result in
                incorrect Output that does not accurately reflect real use case
                scenarios. You should always evaluate the accuracy of any Output
                as appropriate for your use case, including by using human
                review of the Output.
              </p>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              5. Fees and Payments
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">
                (a) Fees and Billing. You will pay all fees charged to your
                account (“Fees”) according to the prices and terms on the
                applicable <Link href="/pricing">pricing</Link> page, or as
                otherwise agreed between us in writing. We have the right to
                correct pricing errors or mistakes even if we have already
                issued an invoice or received payment. You will provide complete
                and accurate billing information including a valid and
                authorized payment method. We will charge your payment method on
                an agreed-upon on deman. You authorize Code Genius and its
                affiliates, and our third-party payment processor(Stripe), to
                charge your payment method for the Fees. If your payment cannot
                be completed, we will provide you written notice and may suspend
                access to the Services until payment is received. Fees are
                payable in U.S. dollars and are due upon invoice issuance.
                Payments are nonrefundable except as provided in this Agreement.
              </p>
              <p className="p-4">
                (b) Price Changes. We may change our prices by posting notice to
                your account and/or to our website. Price increases will be
                effective 14 days after they are posted, except for increases
                made for legal reasons or increases made to Beta Services (as
                defined in our Service Terms), which will be effective
                immediately. Any price changes will apply to the Fees charged to
                your account immediately after the effective date of the
                changes.
              </p>
              <p className="p-4">
                (e) Free Tier. You may not create more than one account to
                benefit from credits provided in the free tier of the Services.
                If we believe you are not using the free tier in good faith, we
                may charge you standard fees or stop providing access to the
                Services.
              </p>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              6. Confidentiality, Security and Data Protection
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">
                (a) Confidentiality. You may be given access to Confidential
                Information of Code Genius, its affiliates and other third
                parties. You may use Confidential Information only as needed to
                use the Services as permitted under these Terms. You may not
                disclose Confidential Information to any third party, and you
                will protect Confidential Information in the same manner that
                you protect your own confidential information of a similar
                nature, using at least reasonable care. Confidential Information
                means nonpublic information that Code Genius or its affiliates
                or third parties designate as confidential or should reasonably
                be considered confidential under the circumstances, including
                software, specifications, and other nonpublic business
                information. Confidential Information does not include
                information that: (i) is or becomes generally available to the
                public through no fault of yours; (ii) you already possess
                without any confidentiality obligations when you received it
                under these Terms; (iii) is rightfully disclosed to you by a
                third party without any confidentiality obligations; or (iv) you
                independently developed without using Confidential Information.
                You may disclose Confidential Information when required by law
                or the valid order of a court or other governmental authority if
                you give reasonable prior written notice to Code Genius and use
                reasonable efforts to limit the scope of disclosure, including
                assisting us with challenging the disclosure requirement, in
                each case where possible.
              </p>
              <p className="p-4">
                (b) Security. You must implement reasonable and appropriate
                measures designed to help secure your access to and use of the
                Services. If you discover any vulnerabilities or breaches
                related to your use of the Services, you must promptly{" "}
                <Link href="mailto:info@code-genius.dev">contact us</Link>
                and provide details of the vulnerability or breach.
              </p>
            </div>
          </div>

          {/* <div className="mx-auto mt-14 w-[80%]">
            <p className="p-4 text-white">
              1. Terms By accessing this Website, accessible from Kodezi.com,
              you are agreeing to be bound by these Website Terms and Conditions
              of Use and agree that you are responsible for the agreement with
              any applicable local laws. If you disagree with any of these
              terms, you are prohibited from accessing this site. The materials
              contained in this Website are protected by copyright and trade
              mark law. 2. Use License Permission is granted to temporarily
              download one copy of the materials on Code Genius. Website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not: modify or copy the materials; use the
              materials for any commercial purpose or for any public display;
              attempt to reverse engineer any software contained on Code Genius.
              Website; remove any copyright or other proprietary notations from
              the materials; or transferring the materials to another person or
              &quot;mirror&quot; the materials on any other server. This will
              let Code Genius. to terminate upon violations of any of these
              restrictions. Upon termination, your viewing right will also be
              terminated and you should destroy any downloaded materials in your
              possession whether it is printed or electronic format. 3.
              Disclaimer All the materials on Code Genius. Website are provided
              &quot;as is&quot;. Code Genius. makes no warranties, may it be
              expressed or implied, therefore negates all other warranties.
              Furthermore, Kodezi Inc. does not make any representations
              concerning the accuracy or reliability of the use of the materials
              on its Website or otherwise relating to such materials or any
              sites linked to this Website. 4. Limitations Code Genius. or its
              suppliers will not be hold accountable for any damages that will
              arise with the use or inability to use the materials on Code
              Genius. Website, even if Code Genius. or an authorize
              representative of this Website has been notified, orally or
              written, of the possibility of such damage. Some jurisdiction does
              not allow limitations on implied warranties or limitations of
              liability for incidental damages, these limitations may not apply
              to you. 5. Revisions and Errata The materials appearing on Code
              Genius. Website may include technical, typographical, or
              photographic errors. Code Genius. will not promise that any of the
              materials in this Website are accurate, complete, or current. Code
              Genius. may change the materials contained on its Website at any
              time without notice. Code Genius. does not make any commitment to
              update the materials. 6. Links Code Genius. has not reviewed all
              of the sites linked to its Website and is not responsible for the
              contents of any such linked site. The presence of any link does
              not imply endorsement by Code Genius. of the site. The use of any
              linked website is at the user’s own risk. 7. Site Terms of Use
              Modifications Code Genius. may revise these Terms of Use for its
              Website at any time without prior notice. By using this Website,
              you are agreeing to be bound by the current version of these Terms
              and Conditions of Use. 8. Your Privacy Please read our Privacy
              Policy. 9. Governing Law Any claim related to Code Genius. Website
              shall be governed by the laws of Delaware without regards to its
              conflict of law provisions.
            </p>
          </div> */}
        </div>
      </div>
    </>
  )
}
