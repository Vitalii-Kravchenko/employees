import EmployeesListItem from "../employees-list-item/employees-list-item";
import EmployeesListWithoutItem from "../employees-list-without-item/employees-list-without-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp, onChangeSalary }) => {

  const elements = data.map(item => {
    const { id, ...itemProps } = item;
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        onDelete={() => onDelete(id)}
        onToggleProp={(e) => onToggleProp(e, id, e.currentTarget.getAttribute('data-toggle'))}
        onChangeSalary={(e) => onChangeSalary(e, id)} />
    )
  })

  return (
    <ul className="app-list list-group">
      {elements.length === 0 ? <EmployeesListWithoutItem /> : elements}
    </ul>
  )
}

export default EmployeesList;