import { INTERFACE_CARD } from '../../interface/card'
import './card.style.css'

export const CardComponent = ({ cards = [{...INTERFACE_CARD}], onClickCard}) => {

    const cif = (condition, value) => {
        return condition ? value : 'not-' + value
    }

    const handleOnClickCard = (item) => {
        if (!item.finded && !item.clicked) {
            onClickCard(item)
        }
    }

    return (
        <ul className="card__container">
        {cards.map(item => (
          <li onClick={() => handleOnClickCard(item)} className={`card__item ${cif(item.finded, 'finded')} ${cif(item.clicked, 'clicked')}`} key={item.id}>
            <div className="flipper">
              <div className="front">
                <img className="card__image" src="https://i.pinimg.com/736x/37/6e/b3/376eb3f9258bba14c991a9f66579f908.jpg" alt="Toxina Marinha" />
              </div>
              <div className="back">
                <img className="card__image" src={item.image} alt="Animal marinho" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
}