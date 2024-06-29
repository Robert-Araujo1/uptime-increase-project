import i18next from '../../../i18n/i18n';

export const columnNames = [
  i18next.t('home.machines.table.customerCol'),
  i18next.t('home.machines.table.machinePinCol'),
  i18next.t('home.machines.table.engineHoursCol'),
  i18next.t('home.machines.table.discoveredOn'),
  i18next.t('home.machines.table.hasDtcsCol'),
  i18next.t('home.machines.table.actionsCol'),
];

export const dateFilterItems = [
  i18next.t('home.machines.filter.anyDateItem'),
  i18next.t('home.machines.filter.lastWeekItem'),
  i18next.t('home.machines.filter.lastMonthItem'),
  i18next.t('home.machines.filter.lastHalfYearItem'),
  i18next.t('home.machines.filter.customItem'),
];

export const statusFilterItems = [
  i18next.t('home.dashboard.completedType'),
  i18next.t('home.dashboard.inProgressType'),
  i18next.t('home.dashboard.notStartedType'),
];
