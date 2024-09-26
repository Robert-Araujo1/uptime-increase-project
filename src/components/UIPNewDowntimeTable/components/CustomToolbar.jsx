import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export default function () {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'right' }}>
      <GridToolbarExport
        csvOptions={{
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}
