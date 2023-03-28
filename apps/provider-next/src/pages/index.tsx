import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { apiService, Stats } from '@one-chat/api-sdk'
import { Box } from '@fower/react'

interface Props {
  stats: Stats
}

export default function PageHome({ stats }: Props) {
  return <Box>home</Box>
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return {
    props: {
      locale,
    },
  }
}, sessionOptions)
