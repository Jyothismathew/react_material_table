import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getAgencyData, getAllAgencies, getRegion } from '../services/apiClient';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


let apiResult = '';

// TO DO fetch from  api
// TO DO create sortable table
function SimpleTable(props) {
  const { classes } = props;
  const [initialized, setInitialized] = useState(false);
  const [rows, setRows] = useState(false);
  const [dropdownValues, SetDropdownValues] = useState('');
  const [dropdownValues2, SetDropdownValues2] = useState('');
  const [fillteredRow, SetFillteredRow] = useState('');


  function handleChangeRegion(event) {
    const fillterRow = fillteredRow.filter(row => row.name.includes(event.target.value));
    setRows(fillterRow);
  }
  function handleChange(event) {
    getRegion(event.target.value).then((data) => {
      SetDropdownValues2(data);
      const fillteredRowLocal = apiResult.filter(row => row.name.includes(event.target.value));

      SetFillteredRow(fillteredRowLocal);
      setRows(fillteredRowLocal);
    });
  }
  useEffect(() => {
    if (!initialized) {
      getAgencyData()
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log('>>>>>>>.', data);
          apiResult = data;
          setRows([...apiResult]);
        });
      getAllAgencies().then((data) => {
        // eslint-disable-next-line no-console
        console.log('++++++++.', data);
        SetDropdownValues(data);
        getRegion(data[0]).then((region) => {
          SetDropdownValues2(region);
        });
      });

      setInitialized(true);
    }
  });

  return rows && dropdownValues && (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <div>
              <InputLabel htmlFor="Agency-simple">Agency</InputLabel>
              <Select
                onChange={handleChange}
                inputProps={{
                  name: 'Agency',
                  id: 'Agency-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
  dropdownValues.map(menu => <MenuItem value={menu.key}>{menu.label}</MenuItem>)
          }
              </Select>
            </div>
          </FormControl>

        </Grid>
        <Grid item xs={3}>
          {
        dropdownValues2
          && (
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="Region-simple">Region</InputLabel>
            <Select
              onChange={handleChangeRegion}
              inputProps={{
                name: 'Region',
                id: 'Region-simple',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
  dropdownValues2.map(menu => <MenuItem value={menu.key}>{menu.label}</MenuItem>)
          }
            </Select>
          </FormControl>
          )
          }
        </Grid>
        <Grid item xs={12}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat (g)</TableCell>
                <TableCell align="right">Carbs (g)</TableCell>
                <TableCell align="right">Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
}

SimpleTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};
// http://codekirei.com/posts/currying-with-arrow-functions/
export default withStyles(styles)(SimpleTable);
