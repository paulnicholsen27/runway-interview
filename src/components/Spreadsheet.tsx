import _ from 'lodash';
import React, { useState } from 'react';
import { Box, Flex, Tag } from '@chakra-ui/react';
import Cell from 'components/Cell';

const NUM_ROWS = 10;
const NUM_COLUMNS = 8;

const Spreadsheet: React.FC = () => {

  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  const displayValue = (value) => { // this is buggy & could be better done with useEffect hook but I'm out of time
    if (value && Number(value.replace(",", "")) == value.replace(",", "")) {
      return "$" + parseFloat(value).toLocaleString("en-US")
    } else {
      return value
    }
  }

  return (
    <Box width="full">
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            <Tag>{rowIdx + 1}</Tag>
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                value={displayValue(cellValue)}
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
    </Box>
  );
};

export default Spreadsheet;
