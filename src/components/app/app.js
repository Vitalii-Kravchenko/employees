import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'John C.', salary: 800, increase: false, rise: true, id: uuidv4() },
                { name: 'Alex M.', salary: 3000, increase: true, rise: false, id: uuidv4() },
                { name: 'Carl W.', salary: 5000, increase: false, rise: false, id: uuidv4() }
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addEmployee = (employee) => {
        this.setState(({ data }) => {
            return {
                data: [...data, employee]
            }

        })
    }

    onToggleProp = (e, id, prop) => {
        if ((e.type === 'click') || (e.type === 'keydown' && (e.code === 'Space' || e.code === 'Enter'))) {
            this.setState(({ data }) => ({
                data: data.map(item => {
                    if (item.id === id) {
                        return { ...item, [prop]: !item[prop] }
                    }
                    return item;
                })
            }));
        }
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salary':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    onChangeSalary = (e, id) => {
        const salary = +(e.target.value.replace(/\D/gi, ''));

        this.setState(({data}) => {
            return {
                data: data.map(item => {
                    if (item.id === id) {
                        item.salary = salary;
                    }

                    return item;
                })
            }
        })

        console.log(this.state)
    }

    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAddEmployee={this.addEmployee} />
            </div>
        );
    }
}

export default App;