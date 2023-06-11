const messages: { text: string; isUser: boolean; timestamp: Date }[] = []

// Function to add a new message
export function addMessage(text: string, isUser: boolean) {
  const message = {
    text: text,
    isUser: isUser,
    timestamp: new Date(),
  }
  if (message && message.text && message.text.trim() !== "") {
    messages.push(message)
  }
  sortMessages()
}

// Function to sort messages chronologically
function sortMessages() {
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

export function getMessages() {
  return messages
}
