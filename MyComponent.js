'use strict';

var PACKAGE = require('./package.json');
var React = require('react');
var ReactDom = require('react-dom');
var Redux = require('redux');
var styles = require('./MyComponent.css');

const { createStore } = Redux;

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }

  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

const Heading = (props) =>
  <h1>{props.children}</h1>;

var Decoupled = React.createClass({
  componentWillMount: function(){
    this.setState({
      store: createStore(counter)
    });
  },

  componentDidMount: function() {
    this.state.store.subscribe(this.update);

    this.update();
  },

  update: function(){
    this.setState({
      count: this.state.store.getState()
    });
  },

  handleDecrement: function(){
    this.state.store.dispatch({ type: 'DECREMENT' });
  },

  handleIncrement: function(){
    this.state.store.dispatch({ type: 'INCREMENT' });
  },

  render: function() {
    return (
      <div>
        <Heading>
          {this.state.store.getState()}
        </Heading>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  },
});

var MyComponent = React.createClass({
  componentDidMount: function() {
    var target = document.getElementById(PACKAGE.name);

    if (target) {
      render(target);
    }
  },

  render: function() {
    if (typeof window === 'object') {
      return (
        <div id={PACKAGE.name}>loading...</div>
      );
    }

    return null;
  },
});

// private

function render(target) {
  ReactDom.render(
    <Decoupled className={styles.MyComponent}/>,
    target,
    function(){}
  );
}

module.exports = MyComponent;
