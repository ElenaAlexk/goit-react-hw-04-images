import { Component } from 'react';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handlNameChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Please enter word for search');
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div>
        <header className={css.Searchbar}>
          <form className={css.Form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.Button}>
              <BiSearch size="25" />
            </button>
            <input
              className={css.Input}
              name="query"
              type="text"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handlNameChange}
            />
          </form>
        </header>
      </div>
    );
  }
}
