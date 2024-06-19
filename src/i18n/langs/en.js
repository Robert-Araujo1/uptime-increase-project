export default {
  translation: {
    auth: {
      password: 'Password',
      confirmPassword: 'Confirm password',
      confirmNewPassword: 'Confirm New Password',
      passwordNotMatch: 'Passwords do not match.',
      passwordSuccess: 'Password changed successfully.',
      login: {
        loginBtn: 'Sign in',
        forgotPasswordBtn: 'Forgot password?',
        signUpBtn: 'Sign up',
      },
      resetPassword: {
        resetPasswordBtn: 'Restore password',
        resetPasswordTitle: 'Password recovery',
        resetPasswordText:
          'If the email {{email}} matches an already registered account, you will receive a link to recover your password in your inbox (or spam).',
        backBtn: 'Back',
      },
      signUp: {
        signUpBtn: 'Register',
      },
    },
    home: {
      machines: {
        pageTitle: 'Machines',
        table: {
          tableTitle: 'Machines',
          customerCol: 'Customer',
          machinePinCol: 'Machine PIN',
          locationCol: 'Location',
          downtimeDaysCol: 'Downtime Days',
          engineHoursCol: 'Engine Hours',
          failureCol: 'DTC',
          statusCol: 'Status',
          actionsCol: 'Actions',
          identifiedInCol: 'Identified in',
          prepositionTablePagination: 'of',
          filterBtnName: 'Filter',
          moreVertBtnName: 'More',
          addEquipOption: 'Add equipment',
          exportOption: 'Export',
          selectStatusBtn: 'Select Status',
        },
        machineData: {
          title: 'Machine Data',
        },
        filter: {
          searchLabel: 'Search',
          dateLabel: 'Date',
          statusLabel: 'Status',
          stateLabel: 'State',
          allItem: 'All',
          severalItemsSelected: 'Several',
          anyDateItem: 'Any date',
          lastWeekItem: 'Last week',
          lastMonthItem: 'Last month',
          lastHalfYearItem: 'Last 6 months',
          customItem: 'Custom',
        },
      },
      dashboard: {
        pageTitle: 'Dashboard',
        completedType: 'Completed',
        inProgressType: 'In Progress',
        notStartedType: 'Not started',
        amountEquipCardTitle: 'Amount of equipment',
        completedCardStatisticLabel: 'last month',
        inProgressCardStatisticLabel: 'Average service time:',
        notStartedCardStatisticLabel: 'Average response time:',
        totalEquipCardStatisticLabel: 'last month',
        customer: 'Customer',
        charts: {
          averageServiceTimeChart: {
            title: 'Average Monthly Time',
            description: 'Service',
          },
          equiptPerStateChart: {
            title: 'Quantity Per States',
            description: 'Equipments',
          },
          completedServiceChart: {
            title: 'Monthly Quantity',
            description: 'Completed',
          },
          averageDowntimeChart: {
            title: 'Average Downtime',
            description: 'Machine Downtime per Region',
            legend: { one: 'Region 1', two: 'Region 2', three: 'Region 3' },
            labelY: 'Days',
          },
        },

        lastUpdates: {
          title: 'Recent Updates',
          action: 'changed the status of the equipment',
          minutesAgo: '{{n}} minutes ago',
          hoursAgo: '{{n}} hours ago',
        },
      },
    },
    genericsWords: {
      none: 'None',
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'June',
        jul: 'July',
      },
      to: 'to',
    },
    genericPhrases: {
      underConstruction: 'Under construction',
    },
  },
};
