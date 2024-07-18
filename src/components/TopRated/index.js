import {Component} from 'react'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Pagination from '../Pagination'
import './index.css'

class TopRated extends Component {
  state = {
    popularList: {},
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getUpdated = popularData => ({
    totalPages: popularData.total_pages,
    totalResults: popularData.total_results,
    results: popularData.results.map(each => ({
      id: each.id,
      posterPath: each.poster_path,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  getPopularMovies = async (pageNo = 1) => {
    const API_KEY = '2b6bed2ca7d926b4afadfb343eebefad'
    const popularUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNo}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(popularUrl, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const popularData = await response.json()
    const updatedPopular = this.getUpdated(popularData)

    this.setState({popularList: updatedPopular})
    console.log(updatedPopular)
  }

  renderPopular = () => {
    const {popularList} = this.state
    if (!popularList.results) {
      return <div>Loading...</div>
    }

    return (
      <ul className="TopRatedUl">
        {popularList.results.map(eachPopular => (
          <MovieItem key={eachPopular.id} movieDetails={eachPopular} />
        ))}
      </ul>
    )
  }

  render() {
    const {popularList} = this.state

    return (
      <>
        <Header />
        <div className="TopRatedBg">
          <h1 className="TopRatedHead">Top Rated</h1>
          {this.renderPopular()}
          <Pagination
            totalPages={popularList.totalPages}
            apiCallBack={this.getPopularMovies}
          />
        </div>
      </>
    )
  }
}

export default TopRated
