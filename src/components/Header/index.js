import {Link, withRouter} from 'react-router-dom'
import PageContext from '../../context/PageContext'
import './index.css'

const Header = props => {
  const renderSearchBar = () => (
    <PageContext.Consumer>
      {value => {
        const {onTriggerSearchBtn, onChangeSearch, searchInput} = value
        const onChangeHandler = event => onChangeSearch(event.target.value)
        const onSearchHandler = () => {
          const {history} = props
          onTriggerSearchBtn()
          history.replace('/searched')
        }
        return (
          <div className="InputCont">
            <input
              onChange={onChangeHandler}
              value={searchInput}
              className="InputBox"
              placeholder="Search..."
              type="search"
            />
            <button
              type="button"
              onClick={onSearchHandler}
              className="SearchBtn"
            >
              Search
            </button>
          </div>
        )
      }}
    </PageContext.Consumer>
  )

  return (
    <nav className="HeaderBg">
      <Link to="/" className="Link">
        <h1 className="LogoHead">MovieDB</h1>
      </Link>
      {renderSearchBar()}
      <ul className="LinksCont">
        <li>
          <Link to="/" className="Link">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className="Link">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/upcoming" className="Link">
            Upcoming
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
