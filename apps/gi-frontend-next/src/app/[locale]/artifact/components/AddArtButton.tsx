import {
  GetAllUserArtifactDocument,
  useAddArtifactMutation,
} from '@genshin-optimizer/gi-frontend-gql'
import { UserContext } from '@genshin-optimizer/gi-ui-next'
import { randomizeArtifact } from '@genshin-optimizer/gi-util'
import { Button } from '@mui/material'
import { useContext } from 'react'

export default function AddArtButton() {
  const { genshinUserId } = useContext(UserContext)
  const [addArtifactMutation, { data, loading, error }] =
    useAddArtifactMutation({
      variables: {
        genshinUserId,
        artifact: randomizeArtifact(),
      },
      update(cache, { data }) {
        const art = data?.addArtifact
        if (!art) return
        cache.updateQuery(
          {
            query: GetAllUserArtifactDocument,
            variables: {
              genshinUserId,
            },
          },
          ({ getAllUserArtifact }) => {
            return {
              getAllUserArtifact: [...getAllUserArtifact, art],
            }
          }
        )
      },
    })
  return (
    <Button onClick={() => addArtifactMutation()}>Add random Artifact</Button>
  )
}
