import React, { Component } from 'react';

const dollarCoins = {
  0: [20, 'twenties'],
  1: [10, 'tens'],
  2: [5, 'fives'],
  3: [1, 'ones'],
  4: [0.25, 'quarters'],
  5: [0.10, 'dimes'],
  6: [0.05, 'nickels'],
  7: [0.01, 'pennies']
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      amountDue: 0,
      amountReceived: 0,
      totalChangeDue: '',
      alertName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: parseFloat(e.target.value) });
  }

  calculate() {
    const amountDue = this.state.amountDue;
    const amountReceived = this.state.amountReceived;

    const totalChangeDue = Math.abs(amountDue.toFixed(2) - amountReceived.toFixed(2));
    let totalChangeLeft = Math.abs(amountDue - amountReceived).toFixed(2);

  // will be arry of integers to represents the count of bills & coins from highest value to lowest
    let moneyCountArry = [];
    let currentMoneyCount = 0;
    if (amountReceived >= amountDue) { //  if you owe change 
      this.setState({ ['totalChangeDue']: `The total change due is $${totalChangeDue}` });
   // document.getElementById('dollars-output').innerHTML=parseInt(totalChangeDue);
      for (let i = 0; i < Object.keys(dollarCoins).length; i++) {
         currentMoneyCount = parseInt(totalChangeLeft / dollarCoins[i][0]);
        moneyCountArry.push(currentMoneyCount);
        totalChangeLeft = (totalChangeLeft - ((currentMoneyCount * dollarCoins[i][0]).toFixed(2)));
        if (totalChangeLeft >= 0) {
          this.setState({ [dollarCoins[i][1]]: currentMoneyCount.toString(),  alertName: 'alert alert-success'  });   
        }
      }
    } else { // thee customer did not give enough money
      this.setState({ ['totalChangeDue']: `The customer owes you $${totalChangeDue}`, alertName: 'alert alert-danger' });
      
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='d-flex modal-dialog-centered p-5' >
          <table className='table w-25 table-light ' id='inputTable'>
            <thead>
              <tr className='table-border table-dark'>
                <h1 className='center'>Change Calculator</h1>
              </tr>
              <tr>
                <th scope='col'><label htmlFor='amountDue'>How much is due?</label><br />
                  $<input
                    type='number'
                    id='amountDue'
                    name='amountDue'
                    className='border-left-0 border-top-0 border-right-0'
                    onChange={ this.handleChange }
                  />
                </th>
              </tr>
              <tr>
                <th scope='col'><label htmlFor='amountReceived'>How much was received?</label><br />
                  $<input
                    className='border-left-0 border-top-0 border-right-0'
                    type='number'
                    id='amountReceived'
                    name='amountReceived'
                    onChange={ this.handleChange }
                    
                  />
                </th>
              </tr>
              <tr>
                <th scope='col'>
                  <button
                    type='button'
                    id='calculate'
                    name='calculate'
                    className='btn btn-block btn-primary'
                    //className='btn btn-primary btn-block'
                    onClick={ this.calculate }
                  >Calculate
                  </button>
                </th>
              </tr>
            </thead>
          </table>
          <div className='text-center w-75' >
            <div id='changeDue' className = {this.state.alertName}>{this.state.totalChangeDue}</div><br />
            <hr />
            <div className='container'>
              <div className='row'>
                <div className='col-sm'>
                Twenties<br />
                <p className="change">{ this.state.twenties }</p>
                </div>
                <div className='col-sm'>
                Tens <br />
                <p className="change">{ this.state.tens}</p>
                </div>
                <div className='col-sm'>
                Fives<br />
                <p className="change">{ this.state.fives }</p>
                </div>
                <div className='col-sm'>
                Ones<br />
                <p className="change">{ this.state.ones}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm'>
                Quarters<br />
                <p className="change">{ this.state.quarters}</p>
                </div>
                <div className='col-sm'>
                 Dimes<br />
                 <p className="change">{ this.state.dimes }</p>
                </div>
                <div className='col-sm'>
                Nickels<br />
                <p className="change">{ this.state.nickels}</p>
                </div>
                <div className='col-sm'>
                Pennies<br />
                <p className="change">{this.state.pennies }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
