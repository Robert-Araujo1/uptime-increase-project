import i18next from '../../../i18n/i18n';

export const columnNames = [
  i18next.t('home.dashboard.customerCol'),
  i18next.t('home.dashboard.machinePinCol'),
  i18next.t('home.dashboard.locationCol'),
  i18next.t('home.dashboard.downtimeDaysCol'),
  i18next.t('home.dashboard.identifiedInCol'),
  i18next.t('home.dashboard.statusCol'),
  i18next.t('home.dashboard.actionsCol'),
];

export const dateFilterItems = [
  i18next.t('home.dashboard.filter.anyDateItem'),
  i18next.t('home.dashboard.filter.lastWeekItem'),
  i18next.t('home.dashboard.filter.lastMonthItem'),
  i18next.t('home.dashboard.filter.lastHalfYearItem'),
  i18next.t('home.dashboard.filter.customItem'),
];

export const statusFilterItems = [
  i18next.t('home.dashboard.completedType'),
  i18next.t('home.dashboard.inProgressType'),
  i18next.t('home.dashboard.notStartedType'),
];
