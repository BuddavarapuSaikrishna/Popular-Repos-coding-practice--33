// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {LanguageDetails, UpdateLanguageId, isActive} = props
  const {language, id} = LanguageDetails

  const btnClassName = isActive ? 'language-btn active-btn' : 'language-btn'

  const OnClickLanguage = () => {
    UpdateLanguageId(id)
  }

  return (
    <li className="language-list-items-container">
      <button className={btnClassName} onClick={OnClickLanguage} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
