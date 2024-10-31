import { downtimeReasons } from './constants';

interface DowntimeReason {
  type: string;
  label: string;
}

export default function translateDowntimeReason(reason: string): string {
  if (reason == null) return 'Não Especificado';

  for (let index = 0; index < downtimeReasons.length; index++) {
    const element: DowntimeReason = downtimeReasons[index];
    if (element.type == reason) {
      return element.label;
    }
  }
  return reason;
}
