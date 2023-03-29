import { Box } from '@fower/react'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Button, PaperAirplaneSolid } from 'bone-ui'
import { useSendMessage } from '../../../hooks'
import { useState } from 'react'

export const ChatFooter = () => {
  const { sendMessage } = useSendMessage()
  const [value, setValue] = useState('')

  async function send() {
    if (!value) return
    sendMessage(value)
    setValue('')
  }

  return (
    <Box borderTop borderTopGray100 toCenterY>
      <Box flex-1 minH-80 toCenterY>
        <TextareaAutosize
          placeholder="请输入..."
          className={css(
            'm0 borderNone w-100p outlineNone px3 py3 flex placeholderGray400 bgWhite',
          )}
          style={{ resize: 'none' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
      <Button
        colorScheme="gray400"
        variant="ghost"
        disabled={!value}
        icon={<PaperAirplaneSolid rotate-90 />}
        mr2
        onClick={() => send()}
      />
    </Box>
  )
}