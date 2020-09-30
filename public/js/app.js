class App extends React.Component {
  state = {
    name: '',
    image: '',
    country: '',
    description: '',
    sausages: []
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    axios
    .post('/sausages', this.state)
    .then(response =>
      this.setState(
        {
          sausages: response.data,
          name: '',
          image: '',
          country: '',
          description: ''
         }
      )
    )
  }
  componentDidMount = () => {
    axios.get('/sausages').then(response => {
      this.setState({
        sausages: response.data
      })
    })
  }
  deleteSausage = event => {
    axios.delete('/sausages/' + event.target.value).then(response => {
      this.setState({
        sausages: response.data
      })
    })
  }
  updateSausage = event => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/sausages/' + id, this.state).then(response => {
      this.setState({
        sausages: response.data,
        name: '',
        image: '',
        country: '',
        description: ''
      })
    })
  }
  render = () => {
    return (
      <div>
        <form className="sausage-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" onChange={this.handleChange} />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input type="text" id="image" onChange={this.handleChange} />
          <br />
          <label htmlFor="country">Country</label>
          <br />
          <input type="text" id="country" onChange={this.handleChange} />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <input type="text" id="description" onChange={this.handleChange} />
          <br />
          <input type="submit" value="CREATE SAUSAGE" />
        </form>
        <h2>Yummy Sausages to Try</h2>
        <div className="sausage-container">
        <div className="row row-cols-2">
          { this.state.sausages.map( sausage => { return (
              <div className="col mb-2">
              <div className="card sausage-card h-100">
              <div className="card-body" key={sausage._id}>
                <h3>{sausage.name}</h3> <br />
                <img src={sausage.image} className="card-img sausage-img"/> <br />
                <h5>{sausage.country}</h5> <br />
                <h6>{sausage.description}</h6> <br />
                <details>
                  <summary>EDIT</summary>
                  <form id={sausage._id} onSubmit={this.updateSausage}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                    <br />
                    <label htmlFor="image">Image</label>
                    <br />
                    <input
                      type="text"
                      id="image"
                      onChange={this.handleChange}
                      value={this.state.species}
                    />
                    <br />
                    <label htmlFor="country">Country</label>
                    <br />
                    <input
                      type="text"
                      id="country"
                      onChange={this.handleChange}
                      value={this.state.image}
                    />
                    <br />
                    <label htmlFor="description">Description</label>
                    <br />
                    <input
                      type="text"
                      id="description"
                      onChange={this.handleChange}
                      value={this.state.image}
                    />
                    <input type="submit" value="UPDATE" />
                  </form>
                </details>
                <button value={sausage._id} onClick={this.deleteSausage}>
                  DELETE
                </button>

              </div>
            </div>
        </div>
          ) } ) }
          </div>
          </div>
          </div>
    )
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
