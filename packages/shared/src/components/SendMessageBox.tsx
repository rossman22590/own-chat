import { Box } from '@fower/react'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Button, PaperAirplaneSolid } from 'bone-ui'
import { useState } from 'react'
import { CHAT_WIDTH, KeyCode_Enter } from '../common'

interface Props {
  onSendMessage(value: string): Promise<any>
}

export const SendMessageBox = ({ onSendMessage }: Props) => {
  const [value, setValue] = useState('')

  async function send() {
    if (!value) return
    setValue('')
    await onSendMessage?.(value)
  }

  return (
    <Box shadow2XL toCenterY toCenterX py4 px4>
      <Box
        toCenterY
        flex-1
        maxW={CHAT_WIDTH}
        shadowXL
        border
        borderGray100
        rounded2XL
        borderTransparent--dark
        bgGray800--dark
      >
        <Box flex-1 minH={[56, 80]} toCenterY>
          <TextareaAutosize
            placeholder="请输入..."
            className={css(
              'm0 borderNone w-100p outlineNone px3 py3 flex placeholderGray400 bgWhite textBase gray300--dark bgTransparent',
            )}
            style={{ resize: 'none' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              const keyCode = e.nativeEvent.keyCode
              if (keyCode === KeyCode_Enter && e.nativeEvent.ctrlKey) {
                setValue(value + '\n')
                return
              }

              if (keyCode === KeyCode_Enter) {
                send()
                e.preventDefault()
                return
              }
            }}
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
    </Box>
  )
}
