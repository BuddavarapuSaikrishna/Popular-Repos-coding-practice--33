// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {RepositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = RepositoryDetails

  return (
    <li className="RepositoryItems-Container">
      <img className="avatarUrl-image" src={avatarUrl} alt={name} />
      <h1 className="resource-name">{name}</h1>
      <div className="stars-container">
        <img
          className="star-image"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="star-count">{starsCount} stars</p>
      </div>
      <div className="forks-container">
        <img
          className="fork-image"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="fork-count">{forksCount} forks</p>
      </div>
      <div className="issues-container">
        <img
          className="issues-image"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="issues-count">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
