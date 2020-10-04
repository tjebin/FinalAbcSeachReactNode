import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, 
  CardTitle,BreadcrumbItem , Breadcrumb} from 'reactstrap';

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };

  onChange = (e) => {
    console.log('onChanges');
    const { options } = this.props.options;
    const userInput = e.currentTarget.value;

    const { suggestions } = this.props.suggestions;

    this.setState({
      activeOption: 0,
     // filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
 
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
      console.log(" 13 "+ activeOption);


    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        console.log(" 38 "+ activeOption);

        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(" 40"+ activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
   const { options } = this.props;
   const  suggestions  = this.props.suggestions;
   console.log("......... hello 3.............."+suggestions[1].Id);

   const  filteredBooks = suggestions.filter(
     (optionName) =>
    
      // optionName.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      optionName.Name.toLowerCase().indexOf("In") > -1,
   );
    const newData = filteredBooks.map((data)=>{
     return(
       <div>
          <Card key={data.Id}>
            <Card.Body>
              <Card.Title>{data.Name}</Card.Title>
                <Card.Text>{data.Description}</Card.Text>
            </Card.Body>
          </Card>
      </div>
     )
    }
  )

    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    
    let optionList;

    if (showOptions && userInput) {
        if (filteredOptions.length) {
            optionList = (
              <ul className="options">
                {filteredOptions.map((optionName, index) => {
                  let className;
               //   console.log(" filteredOptions "+activeOption+" index "+index);
                  if (index === activeOption) {
                    className = 'option-active';
                  }
                  return (
                    <li className={className} key={optionName} onClick={onClick}>
                      {optionName.Name}
                    </li>
                  );
                })}
              </ul>
            );
        } else {
          optionList = (
            <div className="no-options">
              <em>No Option!</em>
            </div>
          );
        }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="search-btn" />
         <div>
         {newData}
        
         </div>
        </div>
       
      </React.Fragment>
    );
  }
}

export default Autocomplete;
