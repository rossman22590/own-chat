import { Box } from '@fower/react'
import { Avatar, Spinner, Tooltip } from 'bone-ui'
import { useTeams } from '../hooks/useTeams'
import { useUpdateActiveTeamId } from '../hooks/useUpdateActiveTeamId'

export const TeamList = () => {
  const { teams, activeTeam, loading } = useTeams()
  const { updateActiveTeamId } = useUpdateActiveTeamId()

  if (loading) {
    return (
      <Box toCenter>
        <Spinner />
      </Box>
    )
  }

  return (
    <Box column toCenterX rowGap-12 mt4>
      {teams.map((item) => {
        const selected = item.id === activeTeam?.id

        return (
          <Box
            key={item.id}
            cursorPointer
            onClick={async () => {
              await updateActiveTeamId(item.id)
            }}
            w-100p
            toBetween
          >
            <Box toCenterY visible={selected} invisible={!selected}>
              <Box h-32 w-3 bgBrand500 />
            </Box>

            <Tooltip placement="right-start" content={item.name}>
              <Avatar
                size={selected ? 42 : 36}
                name={item.name}
                rounded2XL
                shadow2XL--hover
                // scale-110--hover={!selected}
                transitionCommon
              />
            </Tooltip>
            <Box></Box>
          </Box>
        )
      })}
    </Box>
  )
}
