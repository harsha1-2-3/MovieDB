import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallBack, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallBack(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallBack} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallBack(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="NavBtnsCont">
        <button type="button" className="NavBtns" onClick={this.onPrevPage}>
          Prev
        </button>
        <p className="pageNo">{pageNo}</p>
        <button type="button" className="NavBtns" onClick={this.onNextPage}>
          Next
        </button>
      </div>
    )
  }
}
export default Pagination
