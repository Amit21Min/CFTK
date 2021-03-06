import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Checkbox from '@material-ui/core/Checkbox';
import OverflowMenu from '../../OverflowMenu';

// Populates and handles actions for the column headers of a ResourceIndexTable
const ResourceIndexTableHeader = (props) => {
  let column_headers = props.columns.map((column) => {
    let column_header;
    // Different types of column require different rendering
    switch(column.type){
      case 'selectbox':
        column_header = <TableCell key={column.field} padding="checkbox">
                          <Checkbox type="checkbox" name="all-selectbox"
                            onChange={(event) => {props.selectableHandler(event, column)}}/>
                        </TableCell>;
        break;
      case 'overflow-menu':
        column_header = <TableCell key={column.field}>
                          <OverflowMenu key={column.field}
                                        items={column.overflow_items}
                          />
                       </TableCell>
        break;
      case 'drop-down-parent':
      case 'text':
      default:
        //on Click, a column header will send its self to perform an action, ex: sorting -->
        column_header = <TableCell key={column.field}
                            onClick={(event) => {if(props.selectableHandler) {props.selectableHandler(event, column)}}}>
                            {column.html_text}
                        </TableCell>;
    }
    return column_header;
  });

  return (
    <TableHead>
      <TableRow>
        {column_headers}
      </TableRow>
    </TableHead>
  );
};

export default ResourceIndexTableHeader;
