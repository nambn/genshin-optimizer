import type { DBStorage } from '@genshin-optimizer/database'
import { Database, SandboxStorage } from '@genshin-optimizer/database'
import type { GenderKey } from '@genshin-optimizer/sr-consts'
import type { ISrObjectDescription } from '@genshin-optimizer/sr-srod'
import { createContext } from 'react'
import type { ISroDatabase } from '../Interfaces'
import { SroSource } from '../Interfaces'
import { DBMetaEntry } from './DataEntries/DBMetaEntry'
import { BuildResultDataManager } from './DataManagers/BuildResultData'
import { BuildSettingDataManager } from './DataManagers/BuildSettingData'
import { CharMetaDataManager } from './DataManagers/CharMetaData'
import { CharacterDataManager } from './DataManagers/CharacterData'
import { LightConeDataManager } from './DataManagers/LightConeData'
import { RelicDataManager } from './DataManagers/RelicData'
import type { ImportResult } from './exim'
import { newImportResult } from './exim'
import {
  currentDBVersion,
  migrateSr as migrateSROD,
  migrateStorage,
} from './migrate'
export class SroDatabase extends Database {
  relics: RelicDataManager
  chars: CharacterDataManager
  lightCones: LightConeDataManager
  buildSettings: BuildSettingDataManager
  buildResult: BuildResultDataManager
  charMeta: CharMetaDataManager

  dbMeta: DBMetaEntry
  dbIndex: 1 | 2 | 3 | 4
  dbVer: number

  constructor(dbIndex: 1 | 2 | 3 | 4, storage: DBStorage) {
    super(storage)
    migrateStorage(storage)
    // Transfer non DataManager/DataEntry data from storage
    this.dbIndex = dbIndex
    this.dbVer = storage.getDBVersion()
    this.storage.setDBVersion(this.dbVer)
    this.storage.setDBIndex(this.dbIndex)

    // Handle Datamanagers
    this.chars = new CharacterDataManager(this)

    // Weapons needs to be instantiated after character to check for relations
    this.lightCones = new LightConeDataManager(this)

    // Artifacts needs to be instantiated after character to check for relations
    this.relics = new RelicDataManager(this)

    this.buildSettings = new BuildSettingDataManager(this)

    // This should be instantiated after artifacts, so that invalid artifacts that persists in build results can be pruned.
    this.buildResult = new BuildResultDataManager(this)

    this.charMeta = new CharMetaDataManager(this)

    // Handle DataEntries
    this.dbMeta = new DBMetaEntry(this)

    // invalidates character when things change.
    this.chars.followAny(() => {
      this.dbMeta.set({ lastEdit: Date.now() })
    })
    this.relics.followAny(() => {
      this.dbMeta.set({ lastEdit: Date.now() })
    })
    this.lightCones.followAny(() => {
      this.dbMeta.set({ lastEdit: Date.now() })
    })
  }
  get dataManagers() {
    // IMPORTANT: it must be chars, weapon, arts in order, to respect import order
    return [
      this.chars,
      this.lightCones,
      this.relics,
      this.buildSettings,
      this.buildResult,
      this.charMeta,
    ] as const
  }
  get dataEntries() {
    return [this.dbMeta] as const
  }

  clear() {
    this.dataManagers.map((dm) => dm.clear())
    this.dataEntries.map((de) => de.clear())
  }
  get gender() {
    const gender: GenderKey = this.dbMeta.get().gender ?? 'F'
    return gender
  }
  exportSROD() {
    const srod: Partial<ISroDatabase & ISrObjectDescription> = {
      format: 'SROD',
      dbVersion: currentDBVersion,
      source: SroSource,
      version: 1,
    }
    this.dataManagers.map((dm) => dm.exportSROD(srod))
    this.dataEntries.map((de) => de.exportSROD(srod))
    return srod as ISroDatabase & ISrObjectDescription
  }
  importSROD(
    srod: ISrObjectDescription & ISroDatabase,
    keepNotInImport: boolean,
    ignoreDups: boolean
  ): ImportResult {
    srod = migrateSROD(srod)
    const source = srod.source ?? 'Unknown'
    // Some Scanners might carry their own id field, which would conflict with GO dup resolution.
    if (source !== SroSource) {
      srod.relics?.forEach((a) => delete (a as unknown as { id?: string }).id)
      srod.lightCones?.forEach(
        (a) => delete (a as unknown as { id?: string }).id
      )
    }
    const result: ImportResult = newImportResult(
      source,
      keepNotInImport,
      ignoreDups
    )

    // Follow updates from char/relic/lightCone to gather import results
    const unfollows = [
      this.chars.followAny((key, reason, value) => {
        const arr = result.characters[reason]
        const ind = arr.findIndex((c) => c?.key === key)
        if (ind < 0) arr.push(value)
        else arr[ind] = value
      }),
      this.relics.followAny((_key, reason, value) =>
        result.relics[reason].push(value)
      ),
      this.lightCones.followAny((_key, reason, value) =>
        result.lightCones[reason].push(value)
      ),
    ]

    this.dataManagers.map((dm) => dm.importSROD(srod, result))
    this.dataEntries.map((de) => de.importSROD(srod, result))
    unfollows.forEach((f) => f())

    return result
  }
  clearStorage() {
    this.dataManagers.map((dm) => dm.clearStorage())
    this.dataEntries.map((de) => de.clearStorage())
  }
  saveStorage() {
    this.dataManagers.map((dm) => dm.saveStorage())
    this.dataEntries.map((de) => de.saveStorage())
    this.storage.setDBVersion(this.dbVer)
    this.storage.setDBIndex(this.dbIndex)
  }
  swapStorage(other: SroDatabase) {
    this.clearStorage()
    other.clearStorage()

    const thisStorage = this.storage
    this.storage = other.storage
    other.storage = thisStorage

    this.saveStorage()
    other.saveStorage()
  }
  toExtraLocalDB() {
    const key = `extraDatabase_${this.storage.getDBIndex()}`
    const other = new SandboxStorage(undefined, 'sro')
    const oldstorage = this.storage
    this.storage = other
    this.saveStorage()
    this.storage = oldstorage
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(other.entries)))
  }
}
export type DatabaseContextObj = {
  databases: SroDatabase[]
  setDatabase: (index: number, db: SroDatabase) => void
  database: SroDatabase
}
export const DatabaseContext = createContext({} as DatabaseContextObj)
