import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import {
  BasicLayout,
  IconAndroid,
  IconIOS,
  IconWindows,
  LOGIN_SUCCESS_REDIRECT_URL,
} from '@own-chat/shared'
import { Box } from '@fower/react'
import { Button, toast } from 'bone-ui'

export default function PageDownload() {
  function comingSoon() {
    toast.info('Coming soon...')
  }
  return (
    <Box column mb-80 maxW-960 mx-auto px5>
      <Box my-100>
        <Box textXL text3XL--md text4XL--lg gray400>
          Download
        </Box>
        <Box text2XL text5XL--md text6XL--lg fontBold>
          <Box fontNormal>Own Chat for</Box>
          <Box>Mac & Windows & iOS & Android</Box>
        </Box>
      </Box>

      <Box column toCenterY rowGap-20>
        <Box toCenterY columnGap-20>
          <Button
            as="a"
            w-200
            colorScheme="gray900"
            leftIcon={<IconIOS fillWhite />}
            href="https://github.com/forsigner/own-chat/releases/download/own-chat-v0.0.8/Own.chat_0.1.0_x64.dmg"
          >
            Download for Mac
          </Button>
          <Button
            w-200
            leftIcon={<IconWindows size={20} fillWhite />}
            href="https://github.com/forsigner/own-chat/releases/download/own-chat-v0.0.8/Own.chat_0.1.0_x64_en-US.msi"
          >
            Download for Windows
          </Button>
        </Box>
        <Box as="a" toCenterY columnGap-20>
          <Button w-200 colorScheme="gray900" leftIcon={<IconIOS fillWhite />} onClick={comingSoon}>
            Download for iOS
          </Button>
          <Button
            w-200
            colorScheme="green500"
            leftIcon={<IconAndroid fillWhite />}
            onClick={comingSoon}
          >
            Download for Android
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

PageDownload.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  if (!payload) {
    return {
      props: {
        locale,
      },
    }
  }

  return {
    redirect: {
      destination: LOGIN_SUCCESS_REDIRECT_URL,
      permanent: false,
    },
  }
}, sessionOptions)
