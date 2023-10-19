/* eslint-disable react/prop-types */

// userName = `@${userName}`  Nunca modificar ni mutar una prop 
// hacerlo de la sig manera en caso de querer usarlo 
// const userNamin = `@${userName}`  crear una constante y pasarle el valor luego.
import {useState} from 'react'
export function TwitterFollowCard ({ userName, name} ) {


    const [isFollowing, setIsFollowing] = useState(false)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing (!isFollowing)
    }
    return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                className="tw-followCard-avatar" 
                alt="El avatar" 
                src={`https://unavatar.io/${userName}`} />
                <div className="tw-followCard-info">
                    <strong>{name}</strong>
                    <span className="tw-followCard-infoUserName">@{userName}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    {text}
                </button>
            </aside>
        </article>
    )
}