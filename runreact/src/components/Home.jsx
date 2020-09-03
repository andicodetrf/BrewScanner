import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom"
import {Container, Button, Row, Col, Card, FormControl, Badge} from "react-bootstrap"
// import cheerio from 'cheerio'


const URL = process.env.REACT_APP_URL;
class Home extends Component {

    state = {
        items: [],
        filterBy: "",
        filteredList: [],
        suppFilteredList: [],
        isFilterSupp: false,
        searchKey: "",
        suppDisabled: false,
        searchError: "",
        displaySort: [],
        lowestToggle: false,
        highestToggle: false,
        currentPage: 1,
        itemsPerPage: 12,
        cart: []
      };


      fetchItems = () => {

        let token = localStorage.getItem("token");
    
        Axios.get(`${URL}/items`, {
          headers: {
            "x-auth-token": token,
          },
        })
          .then((res) => {
            console.log(res.data);

            this.setState({ items: res.data.items});

            localStorage.setItem("items", JSON.stringify(res.data.items))
            localStorage.setItem("timestamps", new Date().toString())
            

        }).catch(err => console.log(err));
    
      }

    componentDidMount() {
      let items = localStorage.getItem("items")
      let lastUpdate = Date.parse(localStorage.getItem("timestamps"));
      let currentTime = new Date()
      // lastUpdate = new Date(2020, 8, 27)
      const TimeDiff = Math.abs(currentTime - lastUpdate)
      const DaysDiff = Math.floor(TimeDiff/(1000*60*60*24))


      if(items && DaysDiff < 2){
        items = JSON.parse(items)  
        // console.log(DaysDiff) 
        console.log(localStorage.items);
        this.setState({ items })
        
        
      } else{
        this.fetchItems();
      }
      
    }

    //for filter
    searchList = (e) =>{
        // console.log(e.target.value);
        // if((e.target.value.match(/[$-/:-?{-~!"^_`\[\]]/)).length > 1){
        
        this.setState({ searchKey: e.target.value, lowestToggle: false, highestToggle: false });

        let matches = [];
        
        if(this.state.isFilterSupp){
            matches =  this.state.suppFilteredList.filter(m => {
              // const regex = new RegExp(`${e.target.value}`, 'gi')
              // return m.itemName.match(regex) 
               return (m.itemName.toLowerCase()).includes(e.target.value.toLowerCase())
             })

        } else {
            this.setState({suppDisabled : true })
              matches =  this.state.items.filter(m => {
                // const regex = new RegExp(`${e.target.value}`, 'gi')
                // return m.itemName.match(regex) || m.itemFrom.match(regex) || m.itemUnit.match(regex)
                return (m.itemName.toLowerCase()).includes(e.target.value.toLowerCase()) || 
                (m.itemUnit.toLowerCase()).includes(e.target.value.toLowerCase()) || 
                (m.itemFrom.toLowerCase()).includes(e.target.value.toLowerCase())
                
             })

        }
      // }

        // console.log(matches)

        if(e.target.value.length === 0){
          this.setState({ filteredList: [] });
          this.setState({suppDisabled : false })
          this.setState({searchError: ""})
        } else {
          this.setState({ filteredList: matches });
            if(matches.length === 0){
              this.setState({searchError: "Not Found"})
            } else {
              this.setState({searchError: ""})
            }
        }
    }

    

    filterSupp = (e) => {
      // console.log(e.target.name);
     
      this.setState({ filterBy: e.target.name, isFilterSupp: true, lowestToggle: false, highestToggle: false });
      
      let matches =  this.state.items.filter(m => {
          return m.itemFrom.match(e.target.name)
      })

      if(matches.length>0){
        this.setState({ suppFilteredList: matches });
      }

    }

    removeFilter = () => {
      this.setState({ filterBy: '' });
      this.setState({ isFilterSupp: false });
      this.setState({ suppFilteredList: [] });
      this.setState({ filteredList: [] });
      this.setState({ searchKey: '' });
      this.setState({ suppDisabled: false });
      this.setState({ searchError: '' });

    }


    showLowestHandler = (e) => {
      this.setState({
        lowestToggle : true, 
        highestToggle: false, 
      }, ()=> this.displaySortFn())
    }

    showHighestHandler = (e) => {
      this.setState({
        highestToggle : true, 
        lowestToggle: false, 
      }, ()=> this.displaySortFn())
    }

    displaySortFn = () => {
      this.setState({
        isFilterSupp: false,
        filterBy:"", 
        suppFilteredList:[]
      })
      
        if(this.state.lowestToggle){
          let temp = [...this.state.items]
          temp.sort((a,b) => Number(a.itemPrice) - Number(b.itemPrice))
          console.log(temp)
          this.setState({
            displaySort : temp,
          })
        } 

        if(this.state.highestToggle){ 
            let temp = [...this.state.items]
            temp.sort((a,b) => Number(b.itemPrice) - Number(a.itemPrice))
            console.log(temp)
            this.setState({
              displaySort: temp, 
            })
          } 
        }

        clearSortHandler = () => {
          this.setState({
            lowestToggle: false,
            highestToggle: false,
            displaySort : []
          })
       
        }

        paginate = (pgNum) => {
          this.setState({currentPage: pgNum})
        }

        mainAddToCart = (item) => {
          this.props.addToCart(item)
        }

        // addToCart = (e) => {
          
        //   console.log(e.target.id)
        //   let temp = [...this.state.items]
        //   let foundItem = temp.find(f => f.itemID === e.target.id)
        //   // console.log(foundItem)
        //   let foundItemIndex = temp.findIndex(f => f.itemID === e.target.id)
        //   console.log('item index', foundItemIndex)

        //   if(foundItem.itemQty){
        //     foundItem.itemQty = foundItem.itemQty - 1 
        //     let addItem = [...this.state.cart];

        //     addItem.push(foundItem)
        //     this.setState({cart: addItem})

        //     temp.splice(foundItemIndex, foundItem)
        //     console.log(temp)
        //     this.setState({items: temp})
        //     }

        // }

    render() {
      console.log("Home: ")
      const displayList = 
      (this.state.isFilterSupp && this.state.searchKey === "") ? this.state.suppFilteredList :  
          ((this.state.filteredList.length > 0) ? this.state.filteredList : (this.state.displaySort.length> 0 ? this.state.displaySort :  this.state.items ))

      //---- start for pagination
      let {currentPage, itemsPerPage} = this.state

      const indexOfLastItem = currentPage * itemsPerPage
      const indexOfFirstItem = indexOfLastItem - itemsPerPage
      const currentItemsList = displayList.slice(indexOfFirstItem, indexOfLastItem)

      let totalPages = []
      for(let i = 1; i<=Math.ceil((displayList.length)/itemsPerPage); i++){
        totalPages.push(i)
      }

      //---- end for pagination
      console.log("state now: ",this.state.items)
      console.log("current items list", currentItemsList)
      console.log("displayList", displayList)
        return (
          <div className="home-page">
            <div className="home-main" >
                
                <Container fluid>
                  <Row className="mb-2">
                    <Col md="2">
                    </Col>

                    <Col md="5" >
                    
                        <FormControl className="shadow-sm bg-white rounded" id="searchbox" type="text" name="filter" value={this.state.searchKey} placeholder="Search..." onChange={this.searchList}/>
                      
                    </Col>

                    <Col md="5" id="page-btn">
                      
                    
                      <nav style={{display: "flex"}}>
                      {/* <a href="#" className="btn btn-outline-warning mr-2 mb-3" ></a> */}

                          <Link to="/cart">
                          <div className="view-cart">
                            
                          <i className="fas fa-cart-plus"></i>
                              <span className="badge badge-danger ml-2">{this.props.cartItemTotal}</span>
                              
                            </div>
                            </Link>
                            
                      
                        <ul className="pagination shadow-sm transparent rounded">
                          {totalPages.map((pg,idx) => (
                          
                            <li key={pg}  className="page-item ">
                                <a className="page-link text-secondary" href="#name" onClick={()=>this.paginate(pg)}> {pg}</a>
                            </li>
                          )
                            
                        )}
                        </ul>
                      </nav>
                      </Col>

                  </Row>

                  <Row>

                  <Col md="2">
                  <Card className="shadow p-3 rounded mb-2 bg-light">
                    <Card.Body>
                      
                    <div>
                  
                      <h6>Searched:</h6>
                      {(this.state.searchKey) ? 
                        <Badge variant="warning" className="text-muted mb-3" size="sm">{this.state.searchKey} <Badge variant="danger" size="xs" onClick={this.removeFilter} style={{cursor: "pointer"}}>X</Badge></Badge>
                      : null
                      }
                    </div>
                    
                    <div>
                      <h6>Filtered:</h6>
                      {(this.state.filterBy) ? 
                      <Badge variant="warning" className="text-muted" size="sm">{this.state.filterBy} <Badge variant="danger" size="xs" onClick={this.removeFilter} style={{cursor: "pointer"}}>X</Badge></Badge>
                      : null
                      }
                    </div>

                    <hr />
                    

                    <h6>Filter By</h6>
                      <Button variant="outline-danger" className="mr-2 mb-2" name="FairPrice" onClick={this.filterSupp} disabled={this.state.suppDisabled? "disabled" : null}>FairPrice</Button>

                      <Button variant="outline-dark" className="mb-2" name="Cold Storage" onClick={this.filterSupp} disabled={this.state.suppDisabled? "disabled" : null}>Cold Storage</Button>

                    <hr />

                    <h6>Sort By Price</h6>
                      <Button variant="outline-danger" className="mr-2 mb-2" id="lowTog" name="lowestToggle" onClick={this.showLowestHandler} disabled={this.state.suppDisabled? "disabled" : null} >
                        <i className="fas fa-sort-down fa-2x"></i>
                      </Button>

                      <Button variant="outline-dark" className="mb-2" id="highTog" name="highestToggle" onClick={this.showHighestHandler} disabled={this.state.suppDisabled? "disabled" : null}>
                        <i className="fas fa-sort-up fa-2x"></i>
                      </Button>

                      {this.state.lowestToggle || this.state.highestToggle ? <Badge variant="danger" className="ml-2"onClick={this.clearSortHandler} style={{cursor: "pointer"}}>X</Badge> : null}

                    
                    </Card.Body>
                  </Card>

                  </Col>

                  <Col md="10">
                  
                  <Row className="row-cols-1 row-cols-md-3" style={{border:"solid 2px transparent"}} >
                    <h6>Hi in deploy {this.state.searchError}</h6>
                  { (this.state.searchError) ? this.state.searchError :
                    currentItemsList.map(item => (
                      <Col key={item.itemID} md="4">
                      <Card  className="mb-3 shadow mb-5 bg-white rounded" style={{minHeight: "24em"}}>
                      <Card.Img variant="top" src={item.itemImgURL} height="200px" style={{objectFit:"contain", }}/>
                          <Card.Body className="text-sm">
                              {item.itemName}
                              <div>
                              {item.itemUnit}
                              </div>
                              <div>
                              ${item.itemPrice}
                              </div>
                              {/* <div>
                              Stock: {item.itemQty}
                              </div> */}
                              <div className="badge badge-dark">
                                <a className="text-white" href={item.itemOriURL}>{item.itemFrom}</a>
                              </div>
                          </Card.Body>
                          <Card.Footer className="text-right">
                                <i className="fas fa-cart-plus indi-cart" onClick={() => this.mainAddToCart(item)} id={item.itemID}></i>
                          </Card.Footer>                                   
                      </Card>
                  </Col>
                    ))
                  }
                  

                  </Row>
                  
                  </Col>
                  </Row>


                </Container>
            </div>
            </div>
        )
    }
}


export default Home