import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
// Connect is used to read from the store

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses </div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {props.expenses.length === 0 ? (
      <p> No expenses</p>
    ) : (
      props.expenses.map(expense => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

// Connect accepts the sub-set of state of the store and return the object (anything)
// It works as HOC as it is taking ExpenseList component as an argument and connects it with the store
export default connect(mapStateToProps)(ExpenseList);
