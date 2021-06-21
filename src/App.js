import React,  { Component } from "react"; 
import { CardList } from "./components/card-list/card-list.component"; 
import { SearchBox } from "./components/seach-box/search-box.component";
import './App.css';

class App extends Component {

  constructor() {
    super();
    // sets default state 
    this.state = {
        monsters : [],
        searchField: ""
    }; 

    // define "this" in constructor . 
    //this.handleChange = this.handleChange.bind(this); 

  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters : users}))
  }

  handleChange = (e) => {
    // uses "this" keyword defined in the constructor
    this.setState({ searchField: e.target.value }, 
      ()=> console.log(this.state))
  }

  render() {
    // destructure to filter out the monster array.
    // const monsters = this.state.monsters;
    // const searchField = this.state.searchField
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters
      .filter( monster => monster.name.toLowerCase()
      .includes(searchField.toLowerCase())
      )

    return (
      <div className="App">
      <h1>Monsters Rolodex</h1>
      {/* since setState is async function, it does not happen immediately. As a solution, set up a second argument that we pass to setState.  */}
        <SearchBox 
        placeholder="Search monsters" 
        handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
  
      </div>
    );
  }
}

export default App;
