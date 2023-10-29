import { useGetAllUserArtifactQuery } from '@genshin-optimizer/gi-frontend-gql'
import type { IArtifact } from '@genshin-optimizer/gi-good'
import { ArtifactCard } from '@genshin-optimizer/gi-ui-next'
import { Grid } from '@mui/material'
const columns = { xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }
export default function ArtifactList({
  genshinUserId,
}: {
  genshinUserId: string
}) {
  const { data, loading, error } = useGetAllUserArtifactQuery({
    variables: {
      genshinUserId,
    },
  })
  return (
    <Grid container spacing={1} columns={columns}>
      {data?.getAllUserArtifact.map((artifact) => (
        <Grid item key={artifact.id} xs={1}>
          <ArtifactCard artifact={artifact as IArtifact} />
        </Grid>
      ))}
    </Grid>
  )
}
