import { convert, selfTag } from '@genshin-optimizer/gi-formula'
import { CardThemed } from '@genshin-optimizer/ui-common'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { CalcContext } from '../../Context/CalcContext'
import useWeapon from '../../Hooks/useWeapon'
import { NodeFieldDisplay } from '../FieldDisplay'

// TODO: Add back all the stuff
export default function WeaponCardPico({ weaponId }: { weaponId: string }) {
  const weapon = useWeapon(weaponId)
  const { calc } = useContext(CalcContext)
  if (!calc || !weapon) return null
  const member0 = convert(selfTag, { member: 'member0', et: 'self' })
  const wep = convert(selfTag, {
    member: 'member0',
    et: 'self',
    src: weapon.key,
  })
  // const weaponSheet = weapon?.key && getWeaponSheet(weapon.key)
  // const UIData = useMemo(
  //   () =>
  //     weaponSheet &&
  //     weapon &&
  //     computeUIData([weaponSheet.data, dataObjForWeapon(weapon)]),
  //   [weaponSheet, weapon]
  // )
  // if (!weapon || !weaponSheet || !UIData) return null

  // const tooltipAddl = (
  //   <Box>
  //     <WeaponStatPico node={UIData.get(input.weapon.main)} />
  //     <WeaponStatPico node={UIData.get(input.weapon.sub)} />
  //   </Box>
  // )

  return (
    <CardThemed
      sx={{
        height: '100%',
        // maxWidth: 128,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <Box
        display="flex"
        flexDirection="column"
        alignContent="flex-end"
        className={`grad-${weaponSheet.rarity}star`}
      >
        <WeaponNameTooltip sheet={weaponSheet} addlText={tooltipAddl}>
          <Box
            component="img"
            src={weaponAsset(weapon.key, weapon.ascension >= 2)}
            maxWidth="100%"
            maxHeight="100%"
            sx={{ mt: 'auto' }}
          />
        </WeaponNameTooltip>
      </Box> */}
      <Typography
        sx={{
          position: 'absolute',
          fontSize: '0.75rem',
          lineHeight: 1,
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      >
        <strong>
          {/* <SqBadge color="primary">
            {WeaponSheet.getLevelString(weapon)}
          </SqBadge> */}
        </strong>
      </Typography>
      {/* {weaponSheet.hasRefinement && (
        <Typography
          sx={{
            position: 'absolute',
            fontSize: '0.75rem',
            lineHeight: 1,
            opacity: 0.85,
            pointerEvents: 'none',
            bottom: 0,
            right: 0,
          }}
        >
          <strong>
            <SqBadge color="secondary">R{weapon.refinement}</SqBadge>
          </strong>
        </Typography>
      )} */}
      <Box>
        Weapon stats:
        {Object.keys(selfTag.weapon).map((key) => (
          <NodeFieldDisplay
            key={key}
            calcResult={calc.compute(member0.weapon[key])}
          />
        ))}
        {Object.keys(selfTag.base).map((key) => (
          <NodeFieldDisplay
            key={key}
            calcResult={calc.compute(wep.base[key])}
          />
        ))}
      </Box>
    </CardThemed>
  )
}
// function WeaponStatPico({ node }: { node: NodeDisplay }) {
//   return (
//     <Typography>
//       {node.info.icon} {nodeVStr(node)}
//     </Typography>
//   )
// }
