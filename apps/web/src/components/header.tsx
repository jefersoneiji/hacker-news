import { Link } from 'react-router-dom'

import { useShrink } from "../utils/useShrink"
import logo from './y18.svg'

export const Header = () => {
    const [shrink] = useShrink()
    return (
        <header>
            <nav className='navbar navbar-expand-lg' style={{ backgroundColor: "#ff6600", maxHeight: shrink ? '24px' : '' }}>
                <div className='container-fluid' style={{ paddingLeft: '2px' }}>
                    <Link to="/" className='navbar-brand d-flex align-items-center' style={{ marginRight: 0 }}>
                        <img src={logo} width={18} height={18} style={{ border: '1px solid white', marginRight: '4px' }} />
                        <b style={{ fontSize: '16px' }}>Hacker News</b>
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                </div>
            </nav>
        </header>
    )
}