import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Tag } from '@chakra-ui/react';
import Cell from 'components/Cell';

const NUM_ROWS = 10;
const NUM_COLUMNS = 8;

const Spreadsheet: React.FC = () => {

  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );



  const onKeyPress = (rowIdx, columnIdx) => {
    document.getElementById("spreadsheet").addEventListener('keydown', e => {
      // this removes the ability to use the cursor to edit text, which might annoy user
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          console.log('You pressed ArrowUp');
          rowIdx = Math.max(rowIdx - 1, 0)
          break;
        case "ArrowDown":
          e.preventDefault()
          console.log('You pressed ArrowDown');
          rowIdx = Math.min(rowIdx + 1, NUM_ROWS)
          break;
        case "ArrowLeft":  
          e.preventDefault()
          console.log('You pressed ArrowLeft');
          columnIdx = Math.max(columnIdx - 1, 0)
          break;
        case "ArrowRight":
          e.preventDefault()
          columnIdx = Math.min(columnIdx + 1, NUM_COLUMNS)
          break;
      }
      return {rowIdx, columnIdx}
    })
  }

  return (
    <Box id="spreadsheet" width="full">
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            <Tag>{rowIdx + 1}</Tag>
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                value={cellValue}
                onKeyPress={onKeyPress}
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
