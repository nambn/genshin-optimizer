'use client'
import { useGetUserQuery } from '@genshin-optimizer/gi-frontend-gql'
import { CardThemed } from '@genshin-optimizer/ui-common'
import { CardContent, CardHeader, Divider } from '@mui/material'
import { useSession } from 'next-auth/react'
import AddArtButton from './components/AddArtButton'
import ArtifactList from './components/ArtifactList'

export default function ArtifactPage() {
  const { data: session } = useSession()
  const userId = session?.user.userId ?? ''
  const { data, loading, error } = useGetUserQuery({
    variables: {
      userId,
    },
  })
  console.log({ data, loading, error })
  if (loading) return null //TODO:suspense
  if (error) return null //TODO: error
  const user = data?.getUserById
  if (!user) return null

  const { genshinUsers } = user
  const genshinUser = (genshinUsers ?? [])[0]

  const genshinUserId = genshinUser.id
  console.log({ genshinUser })

  return (
    <CardThemed>
      <CardHeader title="Artifact Page" />
      <Divider />
      <CardContent>
        <AddArtButton genshinUserId={genshinUserId} />
        <ArtifactList genshinUserId={genshinUserId} />
      </CardContent>
    </CardThemed>
  )
}
