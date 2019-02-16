// react uses the first letter of the component to differentiate from HTML

// * In stateless functions, props is used to pass data. 'this' is not used because it's not a class and neither an instance
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: props.options
    };
  }
  // * todo handleDeleteOptions - Pass the functionality to child components as props is one way only
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  // * todo: handlePick - pass down to Action and setup onClick - bind here
  // * todo: randomly pick an option and alert it
  handlePick(){
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  // this function is to update the options array only
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exits';
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat([option])
      };
    });
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}  
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}  
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle &&<h2> {props.subtitle}</h2>}
    </div>
  );
};

// ! to pass functional component default props 
Header.defaultProps = {
  title: 'Indecision'
};


// ! In stateless functions props needs to be passed as arguments
const Action = (props) => {
  return (
    <div>
      <button 
        onClick={props.handlePick} 
        disabled={!props.hasOptions}
      >
        What Should I do?
      </button>
    </div>
  );
};


// * Options -> Options Component here
// * todo: Setup options prop form Options component
// * todo: Render the length of the array
// * todo: Add Remove All button
// * todo: Setup handleRemoveAll -> alert some message
// * todo: setup onClick to fire the method

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.map((option) => (
        <Option key={option} optionText={option} />
      ))}
    </div>
  );
};

// * bind method can be used to customize a context execution
// * AddOption -> Add Option component here
// * todo: 1. Setup the form with text input and submit button
// * todo: 2. Wire up onSubmit
// * todo: 3. handleAddOption -> fetch the value typed -> if value, then alert
class AddOption extends React.Component {
  //need to set constructor with props as we are using this
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    // for the form you need event that is being handled and prevent default behavior
    e.preventDefault();

    const option = e.target.option.value.trim();
    const error = this.props.handleAddOption(option);
    
    this.setState(() => {
      return {
        error // error : error - this is ES6 syntax
      };
    });
  }
  render() {
    return (
      <div>
        {this.state.error &&  <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type='text' name='option' />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

// * Option -> Option component here

const Option = (props) => {
    return (
      <div>{props.optionText}</div>
      );
};



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
