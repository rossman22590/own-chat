import { useModal } from '@own-chat/easy-modal'
import { Button, PlusOutline } from 'bone-ui'
import { useAddSession } from './hooks/useAddSession'

export const AddSessionButton = () => {
  const { addSession } = useAddSession()
  const { hide } = useModal()

  return (
    <Button
      w-100p
      size="lg"
      colorScheme="white"
      flex-1
      variant="light"
      textSM--i
      leftIcon={<PlusOutline gray500 mr2 square6 textBase--i />}
      onClick={async () => {
        await addSession()
        hide()
      }}
    >
      新建聊天
    </Button>
  )
}
