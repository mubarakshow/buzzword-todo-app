import React, { Component } from 'react';

import './style.css';
// import App from './App';
import {observer} from 'mobx-react';

import Header from './Header'
import TodoList from './Todos'
import Input from './Input'
import Login from './Login'




@observer
export default class Home extends Component {
    constructor(props){
        super(props)
        localStorage.list ? this.props.store.todos = JSON.parse(localStorage.list) : null
        document.querySelector('header').textContent = 'TODO APP'
        console.log(this.props.store.localSignedIn)
        }
       

    render() {
        return(
            <div>
                <Login store={this.props.store} />
                <Input store={this.props.store} />
                <Header store={this.props.store}/>
                <TodoList store={this.props.store} />
            </div>
        )
    }
}