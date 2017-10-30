import React, { Component } from 'react';
import './bootstrap/bootstrap.min.css'
import './App.css';

import Place from './place';

class App extends Component {
  constructor() {
    super();
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      places: [],
      lookupGood: true,
      errMsg: ''
    };
  }

  render() {
    const placeList = this.state.lookupGood ? this._buildPlaceList() : this._buildErr();

    return (
      <div>
        <div className="container-fluid appheading d-flex flex-column justify-content-center">
          <h1 className="text-center white-text">Zip Code Look-up</h1>
          <p className="text-center white-text large-text">Enter a zip code to look-up city.</p>
          
            <form onSubmit={this._handleSubmit} className='align-self-center text-center'>
              <input type="text" ref={(zip) => this.zipCode = zip} className="form-control mb-2" placeholder='Enter Zip Code...' />
              <input type='submit'className='btn btn-primary'/>
            </form>
          
        </div>
        <div className="container">
          <ul className='list-unstyled'>
            {placeList}
          </ul>
        </div>
      </div>
    );
  }

  _handleSubmit(event){
    event.preventDefault();
    if (this.zipCode.value.match(/^\d{5}$/)) {
      this._fetchZipCode();
    } else if (this.zipCode.value !== '') {
      this.setState({ lookupGood: false,
                      errMsg: 'Not a valid US zip code'});
    } else {
      this.setState({ lookupGood: true,
                      errMsg: '',
                      places: []});
    }
  }

  _fetchZipCode () {
    let urlString = `http://api.zippopotam.us/us/${this.zipCode.value}`;
    fetch(urlString).then((responce) => {
                      if (responce.ok) {
                        return responce.json();
                      } else {
                        throw new Error('Zip code not found.')
                      }
                    })
                    .then((jsonResponce) => {
                      this.setState({ places: jsonResponce.places,
                                      lookupGood: true})
                    })
                    .catch ((err) => {
                      this.setState({ lookupGood: false,
                                      errMsg: err.message})
                    });
  }

  _buildPlaceList() {
    return this.state.places.map((place, i) => {
      return <Place city={place['place name']}
                    state={place['state']}
                    longitude={place['longitude']}
                    latitude={place['latitude']}
                    key={i} />
    });
  }

  _buildErr() {
    return <li className='alert alert-danger'><h1>{this.state.errMsg}</h1></li>
  }

}

export default App;
