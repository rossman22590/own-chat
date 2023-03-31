import { format } from 'date-fns'
import { Box } from '@fower/react'
import { UserOutline } from 'bone-ui'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import IconChatgpt from './icon-chatgpt.svg'
import ChatLoading from './chat-loading.svg'
import { memo } from 'react'
import { Message } from '@own-chat/api-sdk'
interface Props {
  message: Message
}
const ChatItem = ({ message }: Props) => {
  const isUser = ChatCompletionResponseMessageRoleEnum.User === message.role

  return (
    <Box toLeft py3>
      <Box mr-10>
        {!isUser && <IconChatgpt style={{ width: 32 }} />}
        {isUser && (
          <Box square-32 toCenter bgSlate100 rounded>
            <UserOutline gray400 square-24 />
          </Box>
        )}
      </Box>

      <Box>
        <Box mb2 toLeft columnGap-8>
          <Box>
            {!isUser && <Box fontMedium>AI</Box>}
            {isUser && <Box fontMedium>User</Box>}
          </Box>
          <Box textXS gray400 selfBottom>
            {format(new Date(message.createdAt), 'yyyy-MM-dd HH:mm:ss')}
          </Box>
        </Box>
        {message.streaming && <ChatLoading />}
        {!message.streaming && <Box leadingRelaxed>{message.content}</Box>}
      </Box>
    </Box>
  )
}

export default memo(ChatItem, (prev, next) => {
  return prev.message.content === next.message.content
})