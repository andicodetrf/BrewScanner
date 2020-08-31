import React, { Component } from 'react'
import Axios from 'axios'
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
        console.log(DaysDiff) 
        this.setState({ items },() => {console.log(this.state.items)});
        
      } else{
        this.fetchItems();
      }
    }

    //for filter
    searchList = (e) =>{
      
        console.log(e.target.value);
        this.setState({ searchKey: e.target.value });

        let matches;
        if(this.state.isFilterSupp){

            matches =  this.state.suppFilteredList.filter(m => {
              const regex = new RegExp(`${e.target.value}`, 'gi')
              return m.itemName.match(regex) 
          })


        } else {
            this.setState({suppDisabled : true })
              matches =  this.state.items.filter(m => {
                const regex = new RegExp(`${e.target.value}`, 'gi')
                return m.itemName.match(regex) || m.itemFrom.match(regex) || m.itemUnit.match(regex)
             })

        }

        // console.log(matches)

        if(e.target.value.length === 0){
          this.setState({ filteredList: [] });
          this.setState({suppDisabled : false })

        } else {
          this.setState({ filteredList: matches });
        }
    }


    filterSupp = (e) => {
      console.log(e.target.name);
     
      this.setState({ filterBy: e.target.name, isFilterSupp: true });
      
        let matches =  this.state.items.filter(m => {
          const regex = new RegExp(`${e.target.name}`, 'gi')
          return m.itemFrom.match(regex)
      })

      // console.log(matches)

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
    }


    render() {

      const displayList = 
      (this.state.isFilterSupp && this.state.searchKey === "") ? this.state.suppFilteredList :  
          ((this.state.filteredList.length > 0) ? this.state.filteredList :  this.state.items)
      
        return (
            <div style={{margin: "0 50px"}}>
                
                <Container fluid>

                  <Row className="my-4">
                    <Col md={{ span: 4, offset: 5 }}>
                    
                        <FormControl type="text" name="filter" pattern="[A-Za-z0-9]" value={this.state.searchKey} placeholder="Search..." onInput={this.searchList}/>
                      
                    </Col>
                  </Row>

                  <Row>

                  <Col md="2">
                    
                  <div>
                  
                      <h4>Searched:</h4>

                      {(this.state.searchKey) ? 
                      <p className="text-muted">{this.state.searchKey} <Badge variant="danger" size="xs" onClick={this.removeFilter} style={{cursor: "pointer"}}>X</Badge></p>
                      : null
                      }
                    </div>

                    <div>
                      <h4>Filtered:</h4>
                      {(this.state.filterBy) ? 
                      <p className="text-muted">{this.state.filterBy} <Badge variant="danger" size="xs" onClick={this.removeFilter} style={{cursor: "pointer"}}>X</Badge></p>
                      : null
                      }
                    </div>

                    <hr />

                    <h4>Sort By Price</h4>
                    <Button variant="outline-danger" className="mr-2">Lowest</Button>
                    <Button variant="outline-dark">Highest</Button>
                    <hr />
                    <h4>Filter By Supplier</h4>
                    <Button variant="outline-danger" className="mr-2" name="FairPrice" onClick={this.filterSupp} disabled={this.state.suppDisabled? "disabled" : null}>FairPrice</Button>
                    <Button variant="outline-dark" name="Cold Storage" onClick={this.filterSupp} disabled={this.state.suppDisabled? "disabled" : null}>Cold Storage</Button>

                  </Col>

                  <Col md="10">
                  
                  <Row className="row-cols-1 row-cols-md-3" style={{border:"solid 2px black"}} >
                  
                  

                  {displayList.map(item => (
                          <Col key={item.itemID} md="4">
                              <Card  className="mb-3" style={{height: "24em"}}>
                              <Card.Img variant="top" src={item.itemImgURL} height="200px" style={{objectFit:"contain"}}/>
                                  <Card.Body className="text-sm">
                                      {item.itemName}
                                      <div>
                                      {item.itemUnit}
                                      </div>
                                      <div>
                                      ${item.itemPrice}
                                      </div>
                                      <div>
                                      Supplied By: {item.itemFrom}
                                      </div>
                                      <div>
                                        <a href={item.itemOriURL} target="_blank">Visit {item.itemFrom}</a>
                                      </div>
                                  </Card.Body>
                              </Card>
                          </Col>
                  ))}
                  

                  </Row>
                  
                  </Col>
                  </Row>


                </Container>
            </div>
        )
    }
}


export default Home