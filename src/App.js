import React, { Component } from 'react';
import '../public/css/App.css';
import KeyPad from './components/keypad';
import Screen from './components/screen';
import math from 'mathjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: '',
      operation: '',
      sqrtAutoBracket: false,
      error: '',
    }
    this.onBtnClick = this.onBtnClick.bind(this);
    this.setOperation = this.setOperation.bind(this);
  }
  onBtnClick(e){
    this.setOperation(e.target.value);
  }
  setOperation(click){
    var val = click;
    var autoBracket = this.state.sqrtAutoBracket;
    var prevVal =
     this.state.operation !== '' 
     ? this.state.operation[this.state.operation.length-1] : '';
    switch(val){
      case '÷':
        val = '/';
        break;
      case '×':
        val = '*';
        break;
      case '%':
        val = '/100';
        break;
      case 'x²':
        click = '²';
        val = "^2";
        break;
      case '√':
        val = "sqrt";
        break;
      case 'C':
        this.setState({operation: ''});
        this.setState({output: ''});
        return;
      default:
    }
    if(val === "="){
      var result;
      if(autoBracket){
        try{
          result =  math.format(math.eval(this.state.operation.concat(')')), {precision: 14});
        }catch(e){
          this.setState({error: "expression error"});
          setInterval(() =>{
            this.setState({error: ""})
          },500)
          return;
        }
        this.setState({sqrtAutoBracket: false});
        this.setState({output: result.toString()});
        this.setState({operation: result.toString()});
        return;
      }
      try{
        result = math.format(math.eval(this.state.operation), {precision: 14});
      }catch(e){
        this.setState({error: "expression error"});
        setInterval(() =>{
            this.setState({error: ""})
        },500)
        return;
      } 
      this.setState({output: result.toString()});
      this.setState({operation: result.toString()});
      return;
    }
   if( (prevVal === '' || prevVal === '(') && val === '-'){
      this.setState({operation: this.state.operation.concat(val)});
      this.setState({output: this.state.output.concat(val)});
    }
    if( prevVal === ')' && val === '^2'){
      this.setState({operation: this.state.operation.concat(val)});
      this.setState({output: this.state.output.concat(click)});
    }
    if((prevVal === '' || prevVal === 't' || /\W/.test(prevVal)) && (/\W/g.test(val) && val !== '(' && val !== '.')){
      return;
    }
    if(prevVal === 't' && val !== '('){
      this.setState({operation: this.state.operation.concat(`(${val}`)});
      this.setState({sqrtAutoBracket: true});
    }else if(autoBracket && /\W/.test(val) && val !== "."){
      this.setState({operation: this.state.operation.concat(`)${val}`)});
      this.setState({sqrtAutoBracket: false});
    }else{
      this.setState({operation: this.state.operation.concat(val)});
    }
    this.setState({output: this.state.output.concat(click)})
  }
  render() {
    return (
      <div className="container">
        <Screen error={this.state.error} outPut={this.state.output}/>
        <div className="horizontal-line"/>
        <KeyPad handleClick={this.onBtnClick}/>
      </div>
    );
  }
}

export default App;
