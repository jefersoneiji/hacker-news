import { Link } from 'react-router-dom'

import { useShrink } from "../../utils/useShrink"
import logo from './y18.svg'

export const Header = () => {
    const [shrink] = useShrink()
    return (
        <header>
            <nav className='navbar navbar-expand-lg' style={{ backgroundColor: 'var(--blaze-orange)', maxHeight: shrink ? '24px' : '' }}>
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
                    <div className='collapse navbar-collapse' id="navbarSupportedContent">
                        <ul className='navbar-nav align-items-sm-start align-items-lg-center text-dark' style={{ padding: '2px' }}>
                            <NavItem text='new' href='/news' />
                            <VericalRuler />
                            <NavItem text='past' href='/past' />
                            <VericalRuler />
                            <NavItem text='comments' href='/comments' />
                            <VericalRuler />
                            <NavItem text='ask' href='/ask' />
                            <VericalRuler />
                            <NavItem text='show' href='/show' />
                            <VericalRuler />
                            <NavItem text='jobs' href='/jobs' />
                            <VericalRuler />
                            <NavItem text='submit' href='/submit' />
                        </ul>
                        <NavAuth />
                    </div>
                </div>
            </nav>
        </header>
    )
}

const VericalRuler = () => <span className='d-none d-lg-block'>|</span>

const NavItem = ({ text, href }: { text: string, href: string }) => {
    return (
        <li className='nav-item'>
            <Link to={href} className='nav-link text-dark'>
                {text}
            </Link>
        </li>
    )
}

const NavAuth = () => {
    return (
        <div className='d-flex flex-lg-fill justify-content-lg-end' style={{ listStyle: 'none' }}>
            <NavItem text='login' href='/login' />
        </div>
    )
}