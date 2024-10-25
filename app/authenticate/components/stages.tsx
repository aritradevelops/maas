'use client'
import { AnimatePresence, motion } from "framer-motion";
import { AuthContextProvider, useAuth } from "@/contexts/auth";
import Email from "./email";
import Otp from "./otp";
import { redirect } from "next/navigation";

// Fade-in animation variants
const fadeVariants = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.5 }, // Adjust duration as needed
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 }, // Adjust duration as needed
  },
};

export default function Stages() {
  const { authState } = useAuth()

  if (authState === 'authenticated') redirect('/dashboard')

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"auth-page"}
        className="w-full h-full"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={fadeVariants}
      >
        {authState === 'email' && <Email />}
        {authState === 'otp' && <Otp />}
      </motion.div>
    </AnimatePresence>
  )
}


