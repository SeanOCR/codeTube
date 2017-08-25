import React from 'react';
import {CATEGORY_VALUES} from '../../shared/constants.js';
import {connect} from 'react-redux';
import * as actions from '../actions';

export default class CategoryBar extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click(e) {
    this.props.onTabClick(e);
  }

  render() {
    let tabs = CATEGORY_VALUES.map((category) => {
        let classes = 'category' + (this.props.selectedCategory === category ? ' selected' : '');
        return <div className={classes} key={category} onClick={() => this.click(category)}>{category.toUpperCase()}</div>;
    });

    return <div className="category-bar">
             {tabs}
           </div>;
  }
};

function mapStateToProps(state) {
  return {
    selectedCategory: state.get('selectedCategory'),
    
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onTabClick: (category) => dispatch(actions.selectCategory(category))
    };
}

export const CategoryBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryBar);
