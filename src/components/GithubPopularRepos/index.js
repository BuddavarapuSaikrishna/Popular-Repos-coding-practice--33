import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    RepositoryItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGithubPopularRepos()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  getGithubPopularRepos = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const formatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        RepositoryItems: formatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  UpdateActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getGithubPopularRepos)
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" width={50} height={50} color="#0284c7" />
    </div>
  )

  renderRepositoryItem = () => {
    const {RepositoryItems} = this.state
    return (
      <>
        <ul className="RepositoryList-Container">
          {RepositoryItems.map(eachRepo => (
            <RepositoryItem RepositoryDetails={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      </>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()

      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="GithubRepo-Container">
        <h1 className="main-heading">Popular</h1>
        <ul className="LanguageList-Container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              LanguageDetails={eachLanguage}
              key={eachLanguage.id}
              UpdateLanguageId={this.UpdateActiveLanguageId}
              isActive={eachLanguage.id === activeLanguageId}
            />
          ))}
        </ul>
        <div>{this.renderRepositories()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
