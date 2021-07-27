import { DateTime } from 'luxon'

const toRelativeTime = (isoString: string | undefined) => {

  if(isoString === undefined) {
    isoString = "";
  }
  return DateTime.fromFormat(isoString, "yyyy-LL-dd HH:mm:ss").setLocale("es-ES").toRelative()
}

export {toRelativeTime};