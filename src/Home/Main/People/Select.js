import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SelectUI from '@material-ui/core/Select';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  constructor({ title, value, options}){
    super()
    this.state = {
        age: '',
        open: false,
        title,
        value,
        options
      };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const options = this.state.options
        .map((o, i) => <MenuItem value={i}>{o}</MenuItem>)
    return (
      <form autoComplete="off" >
        <FormControl 
            style={{width: '80%'}}
            className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">{this.state.title}</InputLabel>            
                <SelectUI 
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {options}
                </SelectUI>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Select = withStyles(styles)(ControlledOpenSelect);