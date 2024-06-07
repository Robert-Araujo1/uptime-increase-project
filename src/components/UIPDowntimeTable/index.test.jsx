import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UIPDowntimeTable from '.';
import { Provider } from 'react-redux';
import store from '../../app/store';
import generateRandomMachines from '../../assets/data/machines';

function createData(customer, machinePin, location, downtimeDays, insertDate) {
  return { customer, machinePin, location, downtimeDays, insertDate };
}

describe('UIPDowntimeTable Component', () => {
  let searchInput;
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => null); // Avoid error messages on console

    const machines = generateRandomMachines().map((machine) =>
      createData(machine[0], machine[1], machine[2], machine[3], machine[4])
    );

    render(
      <Provider store={store}>
        <UIPDowntimeTable machines={machines} />
      </Provider>
    );
    searchInput = screen
      .getByTestId('search-input')
      .querySelector('input[type=text]');
  });
  afterEach(() => {
    console.error.mockRestore();
  });

  const user = userEvent.setup();

  it('should returns the correctly data filtered on text input', async () => {
    await user.type(searchInput, '1');

    const table = screen
      .getByTestId('machines-table')
      .getElementsByTagName('table')[0];

    const machinePin = table.rows[1].querySelector('td').innerHTML;
    const machinePin2 = table.rows[2].querySelector('td').innerHTML;

    await user.type(searchInput, machinePin);
    expect(() => screen.getByText(machinePin2)).toThrow();
  });

  it('should reset table when clear search input', async () => {
    await user.type(searchInput, '1');
    const table = screen
      .getByTestId('machines-table')
      .getElementsByTagName('table')[0];
    const originalSize = table.rows.length;

    await user.type(searchInput, '12');
    const tableFilteredSize = table.rows.length;

    await user.clear(searchInput);
    const newSizeUpdate = table.rows.length;

    expect(originalSize).toBeGreaterThan(tableFilteredSize);
    expect(originalSize).toEqual(newSizeUpdate);
  });
});
