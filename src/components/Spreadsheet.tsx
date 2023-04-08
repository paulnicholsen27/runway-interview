import { Input, Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';

import Cell from 'components/Cell';

const NUM_ROWS = 5;
const NUM_COLUMNS = 3;

const Spreadsheet: React.FC = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant("0")),)
  );


  const getTotal = (columnIdx) => {

    let columnValues = spreadsheetState.map((row) => {
      return row[columnIdx]
    })
    let total = columnValues.slice(0, -1).reduce((a, b) => parseFloat(a) + parseFloat(b))
    
    return String(total)
  }

  return (
    <Box width="full">
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                value={String(cellValue)}
                onChange={(newValue: string) => {
                  const newRow = [
                    ...spreadsheetState[rowIdx].slice(0, columnIdx),
                    newValue,
                    ...spreadsheetState[rowIdx].slice(columnIdx + 1),
                  ];
                  setSpreadsheetState([
                    ...spreadsheetState.slice(0, rowIdx),
                    newRow,
                    ...spreadsheetState.slice(rowIdx + 1),
                  ]);
                }}
              />
            ))}
          </Flex>
        );
      })}
      <Flex>
        {_.times(NUM_COLUMNS, (i) => {
          return <Cell 
            value={getTotal(i)}
            onChange={() => { }} />
          })}
      </Flex>
    </Box>
  );
};

export default Spreadsheet;
