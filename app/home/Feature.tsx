"use client"

import dynamic from "next/dynamic"
import Lottie from "lottie-react"
import Image from "next/image"

import Suggestions from "../../animations/smartImprovements.json"
import TestGeneration from "../../animations/generating-tests.json"
import codeDocumentation from "../../animations/codeDocumentation.json"
import { motion } from "framer-motion"

import Button from "app/components/Button"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const interactivity: any = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.2],
      type: "stop",
      frames: [0],
    },
    {
      visibility: [0.2, 0.5],
      type: "seek",
      frames: [0, 135],
    },
    {
      visibility: [0.5, 0.9],
      type: "stop",
      frames: [150],
    },
  ],
}

const ShowCaseCard = dynamic(() => import("./ShowCaseCard"), {
  loading: () => (
    <Loader2 size={20} color="white" className="h-8 w-8 animate-spin" />
  ),
})

export const AISuggestions = () => {
  return (
    <>
      <Lottie interactivity={interactivity} animationData={Suggestions} />
    </>
  )
}
const AIGeneration = () => {
  return <Lottie interactivity={interactivity} animationData={TestGeneration} />
}
const CodeDocumentation = () => {
  return (
    <Lottie interactivity={interactivity} animationData={codeDocumentation} />
  )
}

export default function Feature({ setShowSignInModal, session }) {
  const ChatIlustration = (
    <div className="mr-6 hidden sm:absolute sm:right-40 sm:mt-6 sm:block">
      <Image
        src="/home/chat.svg"
        alt="Chat with Code Genius"
        width={427}
        height={301}
      />
    </div>
  )

  const CreateAccountButton = (
    <Button
      buttonTextColor="dark"
      variant="mint"
      loading={false}
      text="Sign Up"
      onClick={() => {
        setShowSignInModal(true)
      }}
    />
  )
  const GoAndExploreChat = (
    <Link href="/code-chat">
      <Button
        buttonTextColor="dark"
        variant="mint"
        loading={false}
        text="Go to the chat"
      />
    </Link>
  )

  return (
    <>
      <section className={`mt-8 font-sans text-white`}>
        {/* <ShowCaseCard
          title="The AI programming genius that helps you coding faster, easier, and more efficient!"
          description="Writing great code can be a challenging and time-consuming task, but with Code Genius you can take your skills to the next level! Explore the possibilities!"
          image={AIShowCaseImage}
        /> */}
        <div className="mx-auto mt-28 mb-8 w-full p-4 text-center sm:w-[60%]">
          <motion.h3 className="mx-auto bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
            The AI programming genius that helps you coding faster, easier, and
            more efficient!
          </motion.h3>
          <motion.p className="text-xl my-8 text-gray-200 sm:text-2xl">
            Writing great code can be a challenging and time-consuming task, but
            with Code Genius you can take your skills to the next level! Explore
            the possibilities!
          </motion.p>
        </div>
        <div className="mb-24 grid grid-cols-1 gap-1 sm:grid-cols-2">
          <div className="mx-auto mb-10 mt-12 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <AISuggestions />
          </div>
          <div className="my-auto mt-0 flex flex-col sm:mt-16 sm:h-[280px]">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto w-[100%] text-center text-4xl font-bold text-white sm:ml-0 sm:w-[80%] sm:pl-3 sm:text-left"
            >
              Improve your code and get suggestions
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="my-auto mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left"
            >
              Code Genius analyzes your code in real-time, offering smart
              suggestions and code improvements. From enhancing syntax to
              optimizing algorithms, Code Genius ensures your code is clean,
              efficient, and error-free.
            </motion.p>
          </div>
          <div className="mx-auto mb-10 mt-12 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <AIGeneration />
            {/* <CodeDocumentation /> */}
          </div>
          <div className="my-auto mt-0 flex flex-col sm:mt-16 sm:h-[280px]">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto w-[90%] pl-3 text-center text-4xl font-bold sm:mx-0 sm:mt-4 sm:text-left md:w-[85%]"
            >
              Save time generating code tests
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left"
            >
              Writing tests can be a tedious and time-consuming task. With Code
              Genius you can automatically generate test cases that cover a wide
              range of scenarios, ensuring that your code is thoroughly tested
              and reliable.
            </motion.p>
          </div>
          <div className="mx-auto mb-10 mt-12 flex w-96 items-center justify-start sm:ml-40 sm:w-full">
            <CodeDocumentation />
          </div>
          <div className="my-auto flex flex-col pt-4 sm:mt-16 sm:h-[280px]">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto w-[80%] pl-3 text-center text-4xl font-bold sm:mx-0 sm:mt-0 sm:text-left"
            >
              Create code documentation in seconds
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left"
            >
              Good documentation is key to writing maintainable code. With Code
              Genius, you can automatically generate clear and concise
              documentation for your code.
            </motion.p>
          </div>
        </div>
        <div className="my-20">
          <ShowCaseCard
            title="Chat with Code Genius and ask anything you want!"
            description="Writing great code can be a challenging and time-consuming task, but with Code Genius you can take your skills to the next level! Explore the possibilities!"
            image={ChatIlustration}
            button={!session ? CreateAccountButton : GoAndExploreChat}
          />
        </div>
      </section>
    </>
  )
}

{
  /* <motion.div
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", velocity: 1 }}
            animate={{
              x:
                verticalScroll < 500
                  ? 320
                  : verticalScroll >= 500 && verticalScroll < 1200
                  ? verticalScroll - window.screen.height
                  : verticalScroll - window.screen.height,
            }}
            className={`-ml-50 fixed top-[500px] z-0 mx-auto hidden ${
              verticalScroll > 0 ? "sm:block" : "hidden"
            }  } brightness-25 h-[550px] w-[1250px] bg-gradient-radial from-gradient-dark/40 via-transparent
            to-transparent `}
          ></motion.div> */
}
