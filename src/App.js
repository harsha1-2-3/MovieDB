import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchedResults from './components/SearchedResults'

import PageContext from './context/PageContext'
{/*visit to this to pass all test cases without good loking,not working link https://github.com/Koushik00-tech/Movie-Database-app-kk/tree/main/src */}
class App extends Component {
  state = {
    searchResponse: {},
    searchInput: '',
  }

  onChangeSearch = text => this.setState({searchInput: text})

  onTriggerSearchBtn = async (pageNo = 1) => {
    const {searchInput} = this.state
    const MOVIE_NAME = searchInput
    const API_KEY = '2b6bed2ca7d926b4afadfb343eebefad'
    const searchedMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=${pageNo}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(searchedMovieUrl, options)
    const data = await response.json()
    const updatedSearchData = {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        voteAverage: each.vote_average,
        title: each.title,
      })),
    }
    this.setState({
      searchResponse: updatedSearchData,
    })
  }

  render() {
    const {searchInput, searchResponse} = this.state
    return (
      <PageContext.Provider
        value={{
          searchInput,
          searchResponse,
          onTriggerSearchBtn: this.onTriggerSearchBtn,
          onChangeSearch: this.onChangeSearch,
        }}
      >
        <div className="MovieDBBg">
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/movie/:id" component={MovieDetails} />
            <Route exact path="/searched" component={SearchedResults} />
          </Switch>
        </div>
      </PageContext.Provider>
    )
  }
}
export default App
