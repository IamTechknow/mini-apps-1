// Constants
const MAIN = 0, STEP_ONE = 1, STEP_TWO = 2, STEP_THREE = 3, REVIEW = 4, FINISH = 5;

// React components
var Account = (props) => (
  <div>
    <h3>Account Info</h3>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="account">Account Name</label>
        <input type="text" className="form-control" id="account" name="account" onChange={props.onChange}></input>
      </div>

      <div className="form-group col-md-6">
        <label htmlFor="pass">Password</label>
        <input type="password" className="form-control" id="pass" name="pass" onChange={props.onChange}></input>
      </div>
    </div>
    <button className='btn btn-primary' type="submit">Personal Info</button>
  </div>
);

var PersonalInfo = (props) => (
  <div>
    <h3>Personal Info</h3>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="addr1">Address Line 1</label>
        <input type="text" className="form-control" id="addr1" name="addr1" onChange={props.onChange}></input>
      </div>

      <div className="form-group col-md-6">
        <label htmlFor="addr2">Address Line 2</label>
        <input type="text" className="form-control" id="addr2" name="addr2" onChange={props.onChange}></input>
      </div>
    </div>
    
    <div className="form-row">
      <div className="form-group col-md-9">
        <label htmlFor="city">City</label>
        <input type="text" className="form-control" id="city" name="city" onChange={props.onChange}></input>
      </div>

      <div className="form-group col-md-3">
        <label htmlFor="state">State</label>
        <input type="text" className="form-control" id="state" name="state" maxLength="2" onChange={props.onChange}></input>
      </div>
    </div>
    <button className='btn btn-primary' type="submit">Payment Info</button>
  </div>
);

var PaymentInfo = (props) => (
  <div>
    <h3>Payment Info</h3>
    <div className="form-row">
      <div className="form-group col-md-9">
        <label htmlFor="credit">Credit Card Number</label>
        <input type="text" className="form-control" id="credit" name="credit" maxLength="15" placeholder="Max of 16 characters" onChange={props.onChange}></input>
      </div>

      <div className="form-group col-md-3">
        <label htmlFor="csv">CSV</label>
        <input type="text" className="form-control" id="csv" name="csv" maxLength="3" placeholder="Max of 3 characters" onChange={props.onChange}></input>
      </div>
    </div>
    
    <button className='btn btn-primary' type="submit">Review</button>
  </div>
);

var Review = (props) => (
  <div>
    <h3>Checkout Review</h3>
    <button className='btn btn-primary' onClick={props.onNext}>Checkout</button>
  </div>
);

var Finish = (props) => (
  <div>
    <h3>Checkout Complete!</h3>
    <button className='btn btn-primary' onClick={props.onNext}>Checkout Again!</button>
  </div>
);

var HomePage = (props) => (
  <div>
    <h3>Welcome to Checkout!</h3>
    <button className='btn btn-primary' onClick={props.onNext}>Get Started</button>
  </div>
);

// Main React application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currView: MAIN
    };
  }
  
  // Submit handler, handles the form each time continue is pressed
  onSubmit(event) {
    event.preventDefault();
    // Send a fetch for the corresponding table endpoint
    
    
    // Increment the current view to render the next one
    this.onNext();
  }
  
  // Generic input handler, uses input name attribute to change state
  onInputChange(event) {
    let name = event.target.name;
    
    // Handle specific cases, otherwise just write to state
    this.setState({ [name] : event.target.value });
  }
  
  // Simply increment the current state and wrap around at the ended to recall render()
  onNext() {
    var newState = this.state.currView + 1;
    if (newState > FINISH) {
      newState = MAIN;
    }
    
    this.setState({
      currView: newState
    });
  }
  
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          { this.state.currView === MAIN && <HomePage onNext={this.onNext.bind(this)} /> }
          { this.state.currView === STEP_ONE && <Account onChange={this.onInputChange.bind(this)} /> }
          { this.state.currView === STEP_TWO && <PersonalInfo onChange={this.onInputChange.bind(this)} /> }
          { this.state.currView === STEP_THREE && <PaymentInfo onChange={this.onInputChange.bind(this)} /> }
          { this.state.currView === REVIEW && <Review onChange={this.onInputChange.bind(this)} onNext={this.onNext.bind(this)} /> }
          { this.state.currView === FINISH && <Finish onNext={this.onNext.bind(this)} /> }
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
