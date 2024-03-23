import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UIPDowntimeTable from '.';

describe('UIPDowntimeTable Component', () => {
  let searchInput;
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => null); // Avoid error messages on console

    render(
      <div>
        <UIPDowntimeTable />
      </div>
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
