import  Landing  from "./Components/Landing";
import Home from "./Components/Home"
import Footer from "./Components/Footer"
import { NavBar } from "./Components/NavBar";
import {  BrowserRouter ,Route, Switch } from "react-router-dom";
import './App.css';
import VideogameDetail from "./Components/VideogameDetail";
import VideogameCreate from "./Components/Form"; 
// import PageError from "./Components/PageError"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <NavBar/>
      </Switch>
      <Switch>
      <Route exact path="/" component={Landing}/>
      </Switch>
      <Switch>
        <Route exact path="/home" component={Home}></Route>
      </Switch>
      <Switch>
        <Route exact path="/detail/:id" component={VideogameDetail}/>
        <Route path="/create" component={VideogameDetail}/>
      </Switch>
      <Route exact path="/create" component={VideogameCreate}></Route>
      <Switch>
        <Route>
          <Footer path="/"/>
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}; 

export default App;

{/* <Switch>
<Route component={PageError}></Route>
</Switch> */}