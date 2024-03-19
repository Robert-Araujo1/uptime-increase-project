export default {
  translation: {
    auth: {
      login: {
        password: 'Senha',
        loginBtn: 'Entrar',
        forgotPasswordBtn: 'Esqueceu a senha?',
        signUpBtn: 'Registre-se',
      },
      resetPassword: {
        resetPasswordBtn: 'Recuperar senha',
        resetPasswordTitle: 'Recuperação de senha',
        resetPasswordText:
          'Se o email {{email}} corresponder a uma conta já cadastrada, você receberá na sua caixa de entrada (ou spam) um link de recuperação da sua senha.',
        backBtn: 'Voltar',
      },
      signUp: {
        confirmPassword: 'Confirme a senha',
        signUpBtn: 'Registrar',
        passwordNotMatch: 'As senhas não correspondem.',
      },
    },
    home: {
      machines: {
        pageTitle: 'Equipamentos',
        table: {
          tableTitle: 'Equipamentos',
          customerCol: 'Cliente',
          machinePinCol: 'Chassi',
          locationCol: 'Localização',
          downtimeDaysCol: 'Dias de Inatividade',
          failureCol: 'DTC',
          statusCol: 'Status',
          actionsCol: 'Ações',
          identifiedInCol: 'Identificado em',
          prepositionTablePagination: 'de',
          filterBtnName: 'Filtrar',
          moreVertBtnName: 'Mais',
          addEquipOption: 'Adicionar equipamento',
          exportOption: 'Exportar',
          selectStatusBtn: 'Selecionar Status',
        },
        machineData: {
          title: 'Histórico da máquina',
        },
        filter: {
          searchLabel: 'Pesquisar',
          dateLabel: 'Data',
          statusLabel: 'Status',
          stateLabel: 'Estado',
          allItem: 'Todos',
          severalItemsSelected: 'Vários',
          anyDateItem: 'Em qualquer data',
          lastWeekItem: 'Na última semana',
          lastMonthItem: 'No último mês',
          lastHalfYearItem: 'Nos últimos 6 meses',
          customItem: 'Personalizado',
        },
      },
      dashboard: {
        pageTitle: 'Dashboard',
        completedType: 'Concluído',
        inProgressType: 'Em andamento',
        notStartedType: 'Não iniciado',
        amountEquipCardTitle: 'Total de equipamentos',
        completedCardStatisticLabel: 'mês passado',
        inProgressCardStatisticLabel: 'Tempo médio de atendimento:',
        notStartedCardStatisticLabel: 'Tempo médio de resposta:',
        totalEquipCardStatisticLabel: 'mês passado',
        customer: 'Cliente',
        charts: {
          averageServiceTimeChart: {
            title: 'Tempo Médio Mensal',
            description: 'Atendimento',
          },
          equiptPerStateChart: {
            title: 'Quantidade Por Estados',
            description: 'Equipamentos',
          },
          completedServiceChart: {
            title: 'Quantidade Mensal',
            description: 'Concluídos',
          },
          averageDowntimeChart: {
            title: 'Tempo Médio de Parada',
            description: 'Máquina Parada Por Região',
            legend: {
              one: 'Regional 1',
              two: 'Regional 2',
              three: 'Regional 3',
            },
            labelY: 'Dias',
          },
        },
        lastUpdates: {
          title: 'Últimas Atualizações',
          action: 'alterou o status do equipamento',
          minutesAgo: 'há {{n}} minutos atrás',
          hoursAgo: 'há {{n}} horas atrás',
        },
      },
    },
    genericsWords: {
      none: 'Nenhum',
      months: {
        jan: 'Jan',
        feb: 'Fev',
        mar: 'Mar',
        apr: 'Abr',
        may: 'Mai',
        jun: 'Jun',
        jul: 'Jul',
      },
      to: 'para',
    },
    genericPhrases: {
      underConstruction: 'Em breve',
    },
  },
};
