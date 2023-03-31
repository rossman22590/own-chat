import { fetchChatStream } from '../common/request'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { useMessages } from './useMessages'
import { useSettings } from './useSettings'
import { HisteryMsgQueue } from '../common/histeryMsgQueue'

export function useSendMessage() {
  const { initNewMessage, updateMessage, messages = [] } = useMessages()
  const { settings } = useSettings()
  async function sendMessage(value = '') {
    if (!value) return

    initNewMessage(value)

    const newMsg = [
      {
        content: value,
        role: ChatCompletionResponseMessageRoleEnum.User,
      },
    ]

    const { maxToken, historyMsgLength, temperature, top_p, frequencyPenalty, presencePenalty } =
      settings

    const histeryMsgQueue = new HisteryMsgQueue(historyMsgLength, messages)
    try {
      await fetchChatStream({
        params: {
          temperature: temperature,
          presence_penalty: presencePenalty,
          stream: true,
          top_p: top_p,
          model: 'gpt-3.5-turbo',
          max_tokens: Number(maxToken || '2000'),
          messages: [...newMsg, ...histeryMsgQueue.gethisteryMsgQueue()],
        },
        onMessage(text, done) {
          console.log('text:', text)
          if (!done) {
            updateMessage(text)
          }
        },
        onError(error) {
          console.log('error', error)
        },
        onController(controller) {
          console.log('controller', controller)
        },
      })
    } catch (error) {
      console.log('error:', error)
    }
  }

  return { sendMessage }
}
