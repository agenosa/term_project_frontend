
import './App.css';
import UserInfo from './components/UserInfo'
//import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">    
   
      <div class = "navbarNav">
                <ul class="navbar-nav">
                <h1 ><a href="#0">Tantalus</a></h1>
               
                    <a class="nav-link" href="#0">Home </a>               
                    <a class="nav-link" href="#0">Browse</a>    
                    <a class="nav-link" href="#0">Categories</a>
                

                  <select id="products">
                      <option value="">--Products--</option>
                      <option value="Hiking">Hiking</option>
                      <option value="Skiing">Skiing</option>
                      <option value="Biking">Biking</option>
                      <option value="Climbing">Climbing</option>
                  </select>
  

                  {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Products
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#0">Hiking</a>
                        <a class="dropdown-item" href="#0">Skiing</a>
                        <a class="dropdown-item" href="#0">Biking</a>
                        <a class="dropdown-item" href="#0">Climbing</a>
                    </div>
                  </li> */}
                </ul>

                <div className="inputsearch">
             <input type="text" id="search" name="search" className="search-name" placeholder="Search"/><p>Search</p>
            </div>
                
          </div>

      </header>
      <UserInfo />
  
    </div>
  );
}

export default App;
