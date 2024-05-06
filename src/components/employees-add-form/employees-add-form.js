import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'

import './employees-add-form.css';

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      salary: ''
    }
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAddEmployee = (e) => {
    e.preventDefault();

    const { onAddEmployee } = this.props;
    const { name, salary } = this.state;

    const employee = {
      name: name,
      salary: salary,
      increase: false,
      rise: false,
      id: uuidv4()
    };

    if (name !== '' && salary !== '') {
      return onAddEmployee(employee);
    }
  }

  render() {
    const { name, salary } = this.state;

    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form
          className="add-form d-flex"
          onSubmit={this.onAddEmployee}>
          <input type="text"
            className="form-control new-post-label"
            placeholder="Как его зовут?"
            value={name}
            onChange={this.onValueChange}
            name='name' />
          <input type="number"
            className="form-control new-post-label"
            placeholder="З/П в $?"
            value={salary}
            onChange={this.onValueChange}
            name='salary' />

          <button type="submit"
            className="btn btn-outline-light">Добавить</button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;