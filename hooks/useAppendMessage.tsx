import { useCallback } from "react"
//Returns 7 random characters as the message id.
export function useAppendMessage(messagesRef) {
  const appendMessage = useCallback(
    (token = "", role = "user") => {
      if (role === "assistant") {
        const updatedMessages = messagesRef.current.map((message) => {
          if (message.role === "assistant") {
            return {
              ...message,
              content: token,
            }
          }
          return message
        })
        messagesRef.current = updatedMessages
      } else {
        messagesRef.current = [
          ...messagesRef.current,
          {
            role,
            content: token,
          },
        ]
      }
    },
    [messagesRef],
  )

  return appendMessage
}
