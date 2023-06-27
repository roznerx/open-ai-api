"use client"

import { useSignInModal } from "app/components/modals/SignInModal"
import HeaderWrapper from "app/components/shared/HeaderWrapper"
import Link from "next/link"

export default function Client({ session, translations }) {
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal({
    translations,
  })

  return (
    <>
      <div className="flex min-h-screen flex-nowrap font-sans">
        <div className="mx-auto max-w-max pb-10">
          <SignInModal />
          <HeaderWrapper
            translations={translations}
            setShowSignInModal={setShowSignInModal}
            showSignInModal={showSignInModal}
            session={session}
            userHasAccount={undefined}
          />
          <div className="mx-auto mt-28 w-[80%]">
            <h1 className="my-3 ml-4 text-3xl font-medium text-white">
              Privacy Policy
            </h1>
            <p className="p-4 text-white">
              We, at Code Genius, (together with our affiliates, “CodeGenius”,
              “we”, “our” or “us”), and accessible from{" "}
              <Link href="https://code-genius.dev">
                https://code-genius.dev
              </Link>
              , respect your privacy and are strongly committed to keeping
              secure any information we obtain from you or about you. One of our
              main priorities is the privacy of our visitors. This Privacy
              Policy document contains types of information that is collected
              and recorded by Code Genius and how we use it. If you have
              additional questions or require more information about our Privacy
              Policy, do not hesitate to{" "}
              <Link href="mailto:info@code-genius.dev">contact us</Link>. This
              Privacy Policy applies only to our online activities and is valid
              for visitors to our website with regards to the information that
              they shared and/or collect in Code Genius. This policy is not
              applicable to any information collected offline or via channels
              other than this website. Content By using our website, you hereby
              consent to our Privacy Policy and agree to its terms.
            </p>

            <h2 className="m-4 text-2xl font-medium text-white">
              1. Personal Information
            </h2>

            <div className="p-4 text-white">
              We collect information that alone or in combination with other
              information could be used to identify you as follows: We may
              collect Personal Information if you{" "}
              <span className="font-medium">create an account</span> to use our
              Services or communicate with us as follows:
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">
                  User Information: When you create an account with us, we will
                  collect information associated with your account, including
                  your full name, email and avatar from the OAuth provider.
                  (collectively, “Account Information”).
                </li>
                <li className="mt-2">
                  {" "}
                  We do not collect other type of information such as your
                  personal credentials to access our site or your payment card
                  information.
                </li>
                <li className="mt-2">
                  User Content: When you use our Services, we may collect
                  Personal Information that is included in the input, file
                  uploads, or feedback that you provide to our Services.
                </li>
                <li className="mt-2">
                  Communication Information: If you communicate with us, we may
                  collect your name, contact information, and the contents of
                  any messages you send (“Communication Information”).
                </li>
                <li className="mt-2">
                  Usage Data: We may automatically collect information about
                  your use of the Services, such as the types of content that
                  you view or engage with, the features you use and the actions
                  you take, as well as your time zone, country, the dates and
                  times of access, user agent and version, type of computer or
                  mobile device, computer connection, and IP address.
                </li>
                <li className="mt-2">
                  We use cookies to operate and administer our Services, and
                  improve your experience on it. A “cookie” is a piece of
                  information sent to your browser by a website you visit. You
                  can set your browser to accept all cookies, to reject all
                  cookies, or to notify you whenever a cookie is offered so that
                  you can decide each time whether to accept it. However,
                  refusing a cookie may in some cases prevent you from using, or
                  negatively affect the functionallity or certain areas or
                  features of a website. For more details on cookies please
                  visit{" "}
                  <Link
                    className="underline"
                    href="https://allaboutcookies.org/"
                  >
                    All About Cookies website
                  </Link>
                </li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              2. How we use personal information
            </h2>

            <div className="p-4 text-white">
              We may use Personal Information for the following purposes:
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">
                  To provide, administer, maintain and/or analyze the Services
                </li>
                <li className="mt-2">To improve our Services and Products</li>
                <li className="mt-2">To communicate with you</li>
                <li className="mt-2">
                  To prevent fraud, criminal activity, or misuses of our
                  Services, and to ensure the security of our IT systems,
                  architecture, and networks
                </li>

                <li className="mt-2">
                  To comply with legal obligations and legal process and to
                  protect our rights, privacy, safety, or property, and/or that
                  of our affiliates, you, or other third parties.
                </li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              3. Disclosure of personal information
            </h2>

            <div className="p-4 text-white">
              In some circumstances we may provide your Personal Information to
              third parties without further notice to you, unless required by
              the law:
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">
                  Vendors and Service Providers: To assist us in meeting
                  business operations needs and to perform certain services and
                  functions, we may provide Personal Information to vendors and
                  service providers, including providers of cloud services, and
                  other information technology services providers, event
                  management services, email communication software and email
                  newsletter services, and web analytics services. Pursuant to
                  our instructions, these parties will access, process, or store
                  Personal Information only in the course of performing their
                  duties to us.
                </li>
                <li className="mt-2">
                  Business Transfers: If we are involved in strategic
                  transactions, reorganization, bankruptcy, receivership, or
                  transition of service to another provider (collectively a
                  “Transaction”), your Personal Information and other
                  information may be disclosed in the diligence process with
                  counterparties and others assisting with the Transaction and
                  transferred to a successor or affiliate as part of that
                  Transaction along with other assets.
                </li>
                <li className="mt-2">
                  Legal Requirements: If required to do so by law or in the good
                  faith belief that such action is necessary to (i) comply with
                  a legal obligation, including to meet national security or law
                  enforcement requirements, (ii) protect and defend our rights
                  or property, (iii) prevent fraud, (iv) act in urgent
                  circumstances to protect the personal safety of users of the
                  Services, or the public, or (v) protect against legal
                  liability.
                </li>
                <li className="mt-2">
                  Affiliates: We may disclose Personal Information to our
                  affiliates, meaning an entity that controls, is controlled by,
                  or is under common control with Code Genius. Our affiliates
                  may use the Personal Information we share in a manner
                  consistent with this Privacy Policy.
                </li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              4. Your data and rights
            </h2>
            <div className="p-4 text-white">
              Depending on location, individuals in the EEA, the UK, and across
              the globe may have certain regulations in relation to their
              Personal Information. For example, you may have the right to:
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">Access your Personal Information.</li>
                <li className="mt-2">Delete your Personal Information.</li>
                <li className="mt-2">
                  Correct or update your Personal Information.
                </li>
                <li className="mt-2">
                  Transfer your Personal Information elsewhere.
                </li>
                <li className="mt-2">
                  Withdraw your consent to the processing of your Personal
                  Information where we rely on consent as the legal basis for
                  processing.
                </li>
                <li className="mt-2">
                  Object to or restrict the processing of your Personal
                  Information where we rely on legitimate interests as the legal
                  basis for processing.
                </li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              5. Links and other websites
            </h2>
            <p className="p-4 text-white">
              The Service may contain links to other websites not operated or
              controlled by Code Genius, including social media services (“Third
              Party Sites”). The information that you share with Third Party
              Sites will be governed by the specific privacy policies and terms
              of service of the Third Party Sites and not by this Privacy
              Policy. By providing these links we do not imply that we endorse
              or have reviewed these sites. Please contact the Third Party Sites
              directly for information on their privacy practices and policies.
            </p>
            <h2 className="m-4 text-2xl font-medium text-white">
              6. Security and Retention
            </h2>
            <p className="p-4 text-white">
              We implement commercially reasonable technical, administrative,
              and organizational measures to protect Personal Information both
              online and offline from loss, misuse, and unauthorized access,
              disclosure, alteration, or destruction. However, no Internet or
              email transmission is ever fully secure or error free. In
              particular, email sent to or from us may not be secure. Therefore,
              you should take special care in deciding what information you send
              to us via the Service or email. In addition, we are not
              responsible for circumvention of any privacy settings or security
              measures contained on the Service, or third party websites. We’ll
              retain your Personal Information for only as long as we need in
              order to provide our Service to you, or for other legitimate
              business purposes such as resolving disputes, safety and security
              reasons, or complying with our legal obligations. How long we
              retain Personal Information will depend on a number of factors,
              such as the amount, nature, and sensitivity of the information,
              the potential risk of harm from unauthorized use or disclosure,
              our purpose for processing the information, and any legal
              requirements. We may also anonymize or de-identify your Personal
              Information (so that it can no longer be associated with you) for
              research, improvement or statistical purposes, as described above,
              in which case we may use this information indefinitely without
              further notice to you.
            </p>
            <h2 className="m-4 text-2xl font-medium text-white">
              7. Changes to the privacy policy
            </h2>
            <p className="p-4 text-white">
              We may change this Privacy Policy at any time. When we do, we will
              post an updated version on this page, unless another type of
              notice is required by applicable law. By continuing to use our
              Service or providing us with Personal Information after we have
              posted an updated Privacy Policy, or notified you by other means,
              you consent to the revised Privacy Policy.
            </p>
            <h2 className="m-4 text-2xl font-medium text-white">
              8. How to contact us
            </h2>
            <p className="p-4 text-white">
              Please{" "}
              <Link className="underline" href="mailto:info@code-genius.dev">
                contact support
              </Link>{" "}
              if you have any questions or concerns not already addressed in
              this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
