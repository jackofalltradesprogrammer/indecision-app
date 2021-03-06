import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseModal from './ExpenseModal';

// TODO Refactor EditExpensePage to be a class based component
// TODO Setup mapDispatchToProps editExpense and removeExpense

export class EditExpensePage extends React.Component {
  state = {
    selectedExpense: undefined
  };
  // constructor(props){
  //   super(props);
  //   this.onRemove = this.onRemove.bind(this);
  // }
  onSubmit = expense => {
    // TODO Dispatch the action to edit the expense
    this.props.startEditExpense(this.props.expense.id, expense);
    // TODO Redirect to the dashboard
    this.props.history.push('/');
    // console.log('updated', expense);
  };
  onRemove = () => {
    if (!this.state.selectedExpense) {
      this.setState(() => ({
        selectedExpense: this.props.expense.description
      }));
    } else {
      this.setState(() => ({ selectedExpense: undefined }));
    }
  };

  onRemoveConfirm = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove Expense
          </button>
          <ExpenseModal
            selectedExpense={this.state.selectedExpense}
            onRemove={this.onRemove}
            onRemoveConfirm={this.onRemoveConfirm}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};

// we need to pass the props to the component as they are passed above
const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => {
    dispatch(startEditExpense(id, expense));
  },
  startRemoveExpense: data => {
    dispatch(startRemoveExpense(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
