import React, { Component } from 'react';

import './style.css';
// import App from './App';
import {observer} from 'mobx-react';

import Header from './Header'
import TodoList from './Todos'
import Input from './Input'
import Login from './Login'
import localforage from 'localforage'



@observer
export default class Home extends Component {
    constructor(props){
        super(props)
        this.props.store.listName = 'TODO APP'
        this.props.store.loginPage = 0
        this.props.store.reg = 0
        this.props.store.userPage = 0
         
        if(this.props.match.params.user && this.props.match.params.list){
           this.props.store.hydrate(this.props.match.params.user,this.props.match.params.list)
           localforage.getItem('all', (err, all) => document.title = all[this.props.match.params.list].name)

         }else if (this.props.store.signedIn) {
             localforage.getItem('all', (err,all) => {this.props.store.todos = all[0].todos; console.log(all[0].todos)})

         }else {

            localforage.getItem('alist').then((list) => list ? this.props.store.todos = list : console.log(list))

         }

        }

    render() {
        return(
            <div>
                
                <Input store={this.props.store} />
                <Header store={this.props.store}/>
                <TodoList store={this.props.store} />
            </div>
        )
    }
}
