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
        <input type="text" className="form-control" id="credit" name="credit" maxLength="16" placeholder="Max of 16 characters" onChange={props.onChange}></input>
      </div>

      <div className="form-group col-md-3">
        <label htmlFor="csv">CSV</label>
        <input type="text" className="form-control" id="csv" name="csv" maxLength="3" placeholder="Max of 3 characters" onChange={props.onChange}></input>
      </div>
    </div>
    
    <div className="form-row">
      <div className="form-group col-md-4">
        <label htmlFor="expireMonth">Credit Card Expiration Month</label>
        <select className="form-control" id="expireMonth" name="expireMonth" onChange={props.onChange}>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="expireYear">Credit Card Expiration Year</label>
        <select className="form-control" id="expireYear" name="expireYear" onChange={props.onChange}>
          <option value="19">2019</option>
          <option value="20">2020</option>
          <option value="21">2021</option>
          <option value="22">2022</option>
          <option value="23">2023</option>
          <option value="24">2024</option>
          <option value="25">2025</option>
        </select>
      </div>
      
      <div className="form-group col-md-4">
        <label htmlFor="zip">Credit Card Zip Code</label>
        <input type="text" className="form-control" id="zip" name="zip" maxLength="5" onChange={props.onChange}></input>
      </div>
    </div>
    
    <button className='btn btn-primary' type="submit">Review</button>
  </div>
);

var Review = (props) => (
  <div>
    <h3>Checkout Review</h3>
    <ul className="list-group">
      { props.data.map(item =>
        <li className="list-group-item">{`${item.key}: ${item.val}`}</li>  
      )}
    </ul>
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

  // Takes the app state and returns an array of objects with key and value properties
  // FIXME: Currently assumes all fields are filled
  processState(state) {
    var result = [];
    var keys = ['Username', 'Password', 'Address Line 1', 'Address Line 2', 'City', 'State', 'Credit Card Number',
                'Credit Card CSV', 'Credit Card Expiration Month', 'Credit Card Expiration Year', 'Credit Card Zip Code'];
    var names = ['account', 'pass', 'addr1', 'addr2' , 'city', 'state', 'credit', 'csv', 'expireMonth', 'expireYear', 'zip'];
    var vals = Object.values(state);

    for (var i = 0; i < keys.length; i++) {
      var obj = {key: keys[i], val: state[names[i]]};
      result.push(obj);
    }

    return result;
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          { this.state.currView === MAIN && <HomePage onNext={this.onNext.bind(this)} /> }
          { this.state.currView === STEP_ONE && <Account onChange={this.onInputChange.bind(this)} /> }
          { this.state.currView === STEP_TWO && <PersonalInfo onChange={this.onInputChange.bind(this)} /> }
          { this.state.currView === STEP_THREE && <PaymentInfo onChange={this.onInputChange.bind(this)} /> }
          { this.state.currView === REVIEW && <Review data={this.processState(this.state)} onChange={this.onInputChange.bind(this)} onNext={this.onNext.bind(this)} /> }
          { this.state.currView === FINISH && <Finish onNext={this.onNext.bind(this)} /> }
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
